(() => {
  'use strict';

  const pageIds = ['home','company','vanilla-journey','rse','resources','boutique','quality','compliance','requests'];
  const aliases = {products:'boutique', special:'boutique', top:'home', 'industrial-buy':'boutique'};
  const pages = pageIds.map(id => document.getElementById(id)).filter(Boolean);
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let busy = false;

  if (!pages.length) return;

  function syncHeaderHeight() {
    const h = Math.max(64, Math.round(header?.getBoundingClientRect().height || 88));
    document.documentElement.style.setProperty('--cf-header-h', h + 'px');
  }

  function pageIndexForTarget(target) {
    if (!target) return -1;
    const page = target.classList?.contains('cf-page') ? target : target.closest?.('.cf-page');
    return page ? pages.indexOf(page) : -1;
  }

  function cleanPageClasses(page) {
    page.classList.remove('page-active','page-door-prep','page-door-prep-back','page-door-in','page-door-out','page-door-out-back');
  }

  function setActiveImmediately(index) {
    pages.forEach((page, i) => {
      cleanPageClasses(page);
      const active = i === index;
      page.classList.toggle('page-active', active);
      page.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (active) page.scrollTop = 0;
    });
    current = index;
    updateUi();
  }

  function updateUi() {
    const id = pages[current]?.id || 'home';
    nav?.querySelectorAll('a[href^="#"]').forEach(link => {
      const raw = link.getAttribute('href').slice(1);
      const mapped = aliases[raw] || raw;
      link.classList.toggle('page-nav-active', mapped === id);
    });
    const label = document.querySelector('.page-name');
    if (label) {
      const names = {
        home:'Accueil', company:'Société', 'vanilla-journey':'Origine', rse:'RSE',
        boutique:'Boutique', quality:'Qualité', compliance:'Références', requests:'Contact / Devis'
      };
      label.textContent = names[id] || id;
    }
    const prev = document.querySelector('[data-page-prev]');
    const next = document.querySelector('[data-page-next]');
    if (prev) prev.disabled = current <= 0;
    if (next) next.disabled = current >= pages.length - 1;
    setTimeout(() => window.CFoodTranslate?.(), 0);
  }

  function goToPage(index, options = {}) {
    if (busy || index < 0 || index >= pages.length) return;
    if (index === current) {
      if (options.nestedTarget) {
        options.nestedTarget.scrollIntoView({behavior:reduced ? 'auto' : 'smooth', block:'start'});
      } else {
        pages[current].scrollTo({top:0, behavior:reduced ? 'auto' : 'smooth'});
      }
      if (options.hash) history.replaceState(null,'',options.hash);
      return;
    }

    const outgoing = pages[current];
    const incoming = pages[index];
    const forward = index > current;

    if (reduced) {
      setActiveImmediately(index);
      if (options.hash) history.pushState(null,'',options.hash);
      if (options.nestedTarget) setTimeout(() => options.nestedTarget.scrollIntoView({block:'start'}), 0);
      return;
    }

    busy = true;
    pages.forEach(page => {
      if (page !== outgoing && page !== incoming) {
        cleanPageClasses(page);
        page.setAttribute('aria-hidden','true');
      }
    });

    cleanPageClasses(outgoing);
    cleanPageClasses(incoming);
    outgoing.classList.add(forward ? 'page-door-out' : 'page-door-out-back');
    incoming.classList.add(forward ? 'page-door-prep' : 'page-door-prep-back');
    outgoing.setAttribute('aria-hidden','true');
    incoming.setAttribute('aria-hidden','false');
    incoming.scrollTop = 0;

    void incoming.offsetWidth;
    requestAnimationFrame(() => {
      incoming.classList.remove('page-door-prep','page-door-prep-back');
      incoming.classList.add('page-door-in');
    });

    const destinationIndex = index;
    setTimeout(() => {
      cleanPageClasses(outgoing);
      cleanPageClasses(incoming);
      incoming.classList.add('page-active');
      current = destinationIndex;
      busy = false;
      updateUi();
      if (options.hash) history.pushState(null,'',options.hash);
      if (options.nestedTarget) {
        setTimeout(() => options.nestedTarget.scrollIntoView({behavior:'smooth',block:'start'}), 40);
      }
    }, 760);
  }

  function routeHash(hash, replace = false) {
    const raw = (hash || '#home').replace(/^#/,'') || 'home';
    const mapped = aliases[raw] || raw;
    const target = document.getElementById(raw) || document.getElementById(mapped);
    const pageTarget = document.getElementById(mapped);
    const idx = pages.indexOf(pageTarget);
    if (idx < 0) return false;

    if (replace) {
      setActiveImmediately(idx);
      if (target && target !== pageTarget) setTimeout(() => target.scrollIntoView({block:'start'}), 60);
    } else {
      goToPage(idx, {hash:'#'+raw, nestedTarget:target && target !== pageTarget ? target : null});
    }
    return true;
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const raw = href.slice(1);
    const mapped = aliases[raw] || raw;
    const target = document.getElementById(raw) || document.getElementById(mapped);
    const idx = pages.indexOf(document.getElementById(mapped));
    if (idx < 0) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    goToPage(idx, {hash:href, nestedTarget:target && !target.classList.contains('cf-page') ? target : null});
    nav?.classList.remove('open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
  }, true);

  window.addEventListener('popstate', () => routeHash(location.hash, true));

  const switcher = document.createElement('div');
  switcher.className = 'page-switcher';
  switcher.innerHTML = '<button type="button" data-page-prev aria-label="Page précédente">←</button><button type="button" data-page-next aria-label="Page suivante">→</button>';
  document.body.appendChild(switcher);
  const label = document.createElement('div');
  label.className = 'page-name';
  document.body.appendChild(label);
  switcher.querySelector('[data-page-prev]').addEventListener('click', () => goToPage(current - 1, {hash:'#'+pages[current-1]?.id}));
  switcher.querySelector('[data-page-next]').addEventListener('click', () => goToPage(current + 1, {hash:'#'+pages[current+1]?.id}));

  document.addEventListener('keydown', event => {
    const tag = event.target?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || event.target?.isContentEditable) return;
    if (event.key === 'ArrowLeft' && current > 0) {
      event.preventDefault();
      goToPage(current - 1, {hash:'#'+pages[current-1].id});
    }
    if (event.key === 'ArrowRight' && current < pages.length - 1) {
      event.preventDefault();
      goToPage(current + 1, {hash:'#'+pages[current+1].id});
    }
  });

  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight, {passive:true});
  if ('ResizeObserver' in window && header) new ResizeObserver(syncHeaderHeight).observe(header);

  document.body.classList.add('cf-pages-ready');
  routeHash(location.hash || '#home', true);
  updateUi();
})();