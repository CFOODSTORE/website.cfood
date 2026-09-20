document.documentElement.classList.add('js');

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress span');
  const hero = document.querySelector('.hero');
  const photoBand = document.querySelector('.photo-band img');
  const floating = document.querySelector('.floating-rfq');
  const requests = document.getElementById('requests');

  const revealTargets = document.querySelectorAll(
    '.section-heading, .copy-block, .media-card, .standard-card, .special-card, .quality-points article, .credential-card, .journey-copy, .journey-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal-ready'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));

    if (requests && floating) {
      const requestObserver = new IntersectionObserver(entries => {
        floating.classList.toggle('is-hidden', entries[0]?.isIntersecting);
      }, { threshold: 0.15 });
      requestObserver.observe(requests);
    }
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  let ticking = false;
  const updateScrollEffects = () => {
    const y = window.scrollY || 0;
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = Math.min(Math.max(y / max, 0), 1);
    if (progress) progress.style.transform = 'scaleX(' + ratio + ')';
    if (header) header.classList.toggle('is-scrolled', y > 28);

    if (!reduceMotion) {
      if (hero && y < window.innerHeight * 1.2) {
        hero.style.setProperty('--hero-shift', Math.min(y * 0.11, 72) + 'px');
      }
      if (photoBand) {
        const rect = photoBand.getBoundingClientRect();
        const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
        const shift = Math.max(-38, Math.min(38, -mid * 0.045));
        photoBand.style.setProperty('--band-shift', shift + 'px');
      }
      document.querySelectorAll('.journey-card[data-depth]').forEach(card => {
        const rect = card.parentElement.getBoundingClientRect();
        const depth = Number(card.dataset.depth || 0);
        const shift = Math.max(-40, Math.min(40, -rect.top * depth));
        card.style.setProperty('--parallax', shift + 'px');
      });
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateScrollEffects();

  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.standard-card, .credential-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = 'perspective(900px) rotateX(' + (-y * 2.3) + 'deg) rotateY(' + (x * 2.3) + 'deg) translateY(-7px)';
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }
})();
