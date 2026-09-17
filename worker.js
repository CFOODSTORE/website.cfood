import { getCookie, verifySession, json } from './functions/_lib/auth.js';
import { onRequestPost as loginPost, onRequestGet as loginGet } from './functions/api/admin/login.js';
import { onRequestPost as logoutPost } from './functions/api/admin/logout.js';
import { onRequestGet as contentGet, onRequestPut as contentPut } from './functions/api/admin/content.js';
import { onRequestGet as filesGet, onRequestPut as filesPut } from './functions/api/admin/files.js';
import { onRequestGet as mediaGet, onRequestPost as mediaPost } from './functions/api/admin/media.js';

const ROUTES = {
  '/api/admin/login': { GET: loginGet, POST: loginPost, public: true },
  '/api/admin/logout': { POST: logoutPost, public: true },
  '/api/admin/content': { GET: contentGet, PUT: contentPut },
  '/api/admin/files': { GET: filesGet, PUT: filesPut },
  '/api/admin/media': { GET: mediaGet, POST: mediaPost }
};

const HOME_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://cfood.store/#organization',
      name: 'Challenge Food SARL',
      legalName: 'Challenge Food SARL',
      alternateName: 'Challenge Food',
      url: 'https://cfood.store/',
      logo: 'https://cfood.store/assets/logo.png',
      email: 'commercial.export@cfood.store',
      telephone: '+261322549937',
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'RCS Antananarivo',
        value: '2022 B 00157'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Antananarivo',
        addressCountry: 'MG'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'commercial.export@cfood.store',
        telephone: '+261322549937',
        availableLanguage: ['en', 'fr']
      },
      sameAs: [
        'https://www.goafricaonline.com/mg/624203-challenge-food-import-export-antananarivo-madagascar',
        'https://www.algomtl.com/jauresram'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://cfood.store/#website',
      url: 'https://cfood.store/',
      name: 'Challenge Food',
      publisher: { '@id': 'https://cfood.store/#organization' },
      inLanguage: ['en', 'fr']
    }
  ]
});

const HOME_RESOURCES = `
<section id="resources" class="section section-muted" aria-labelledby="resources-title">
  <div class="container">
    <div class="section-heading">
      <span class="section-kicker">Buyer resources · Ressources acheteurs</span>
      <h2 id="resources-title">Explore Madagascar vanilla with Challenge Food</h2>
      <p>Product guides, supplier information, quality documentation and practical purchasing resources for professional buyers.</p>
    </div>
    <div class="special-grid">
      <article class="special-card"><div class="special-mark">MG</div><h3>Madagascar Vanilla</h3><p>Grades, quality, pricing and export basics.</p><a class="mini-btn" href="/en/madagascar-vanilla.html">English guide</a> <a class="mini-btn" href="/fr/vanille-de-madagascar.html">Guide français</a></article>
      <article class="special-card"><div class="special-mark">B2B</div><h3>Supplier & Wholesale</h3><p>Professional sourcing from Madagascar.</p><a class="mini-btn" href="/en/madagascar-vanilla-supplier.html">Supplier</a> <a class="mini-btn" href="/fr/fournisseur-vanille-madagascar.html">Fournisseur</a></article>
      <article class="special-card"><div class="special-mark">QA</div><h3>Quality & Documents</h3><p>Lot specifications, COA, packing and documentation.</p><a class="mini-btn" href="/en/vanilla-quality-documents.html">Quality</a> <a class="mini-btn" href="/fr/qualite-documents-vanille.html">Qualité</a></article>
      <article class="special-card"><div class="special-mark">✓</div><h3>Supplier Verification</h3><p>Due diligence checklist for professional buyers.</p><a class="mini-btn" href="/en/verify-madagascar-vanilla-supplier.html">Verify</a> <a class="mini-btn" href="/fr/verifier-fournisseur-vanille-madagascar.html">Vérifier</a></article>
      <article class="special-card"><div class="special-mark">CF</div><h3>About Challenge Food</h3><p>Company identity, RCS reference and external profiles.</p><a class="mini-btn" href="/en/about-challenge-food.html">About</a> <a class="mini-btn" href="/fr/a-propos-challenge-food.html">À propos</a></article>
      <article class="special-card"><div class="special-mark">→</div><h3>Buyer Resource Center</h3><p>Guides for pricing, import, export and supplier qualification.</p><a class="mini-btn" href="/en/vanilla-buyer-resources.html">Resources</a> <a class="mini-btn" href="/fr/ressources-acheteurs-vanille.html">Ressources</a></article>
    </div>
  </div>
</section>`;

function adminHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Content-Type-Options', 'nosniff');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

async function handleAdminApi(request, env) {
  const pathname = new URL(request.url).pathname;
  const route = ROUTES[pathname];
  if (!route) return json({ error: 'Not found.' }, 404);

  if (!route.public) {
    const token = getCookie(request, 'cf_admin_session');
    if (!(await verifySession(env, token))) return json({ error: 'Unauthorized' }, 401);
  }

  const handler = route[request.method];
  if (!handler) return json({ error: 'Method not allowed.' }, 405);
  return handler({ request, env });
}

function enhanceHome(response) {
  return new HTMLRewriter()
    .on('head', {
      element(element) {
        element.append(`<link rel="alternate" type="application/rss+xml" title="Challenge Food Buyer Resources" href="/feed.xml"><script type="application/ld+json">${HOME_SCHEMA}</script>`, { html: true });
      }
    })
    .on('footer.site-footer', {
      element(element) {
        element.before(HOME_RESOURCES, { html: true });
      }
    })
    .transform(response);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/admin/')) {
      return handleAdminApi(request, env);
    }

    if (!env.ASSETS) {
      return new Response('Static asset binding is unavailable.', { status: 503 });
    }

    const response = await env.ASSETS.fetch(request);
    if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
      return adminHeaders(response);
    }

    if ((url.pathname === '/' || url.pathname === '/index.html') && (response.headers.get('content-type') || '').includes('text/html')) {
      return enhanceHome(response);
    }

    return response;
  }
};
