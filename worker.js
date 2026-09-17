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
    return response;
  }
};
