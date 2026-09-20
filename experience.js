document.documentElement.classList.add('js');

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress span');
  const floating = document.querySelector('.floating-rfq');
  const requests = document.getElementById('requests');
  const gsapReady = Boolean(window.gsap && window.ScrollTrigger);

  function updateChrome() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = Math.min(Math.max(y / max, 0), 1);
    if (progress) progress.style.transform = 'scaleX(' + ratio + ')';
    if (header) header.classList.toggle('is-scrolled', y > 30);
  }

  let chromeTick = false;
  function requestChromeUpdate() {
    if (chromeTick) return;
    chromeTick = true;
    requestAnimationFrame(() => {
      updateChrome();
      chromeTick = false;
    });
  }
  window.addEventListener('scroll', requestChromeUpdate, { passive:true });
  window.addEventListener('resize', requestChromeUpdate, { passive:true });
  updateChrome();

  if ('IntersectionObserver' in window && requests && floating) {
    const requestObserver = new IntersectionObserver(entries => {
      floating.classList.toggle('is-hidden', Boolean(entries[0] && entries[0].isIntersecting));
    }, { threshold:.12 });
    requestObserver.observe(requests);
  }

  function fallbackReveal() {
    const targets = document.querySelectorAll(
      '.section-heading, #company .copy-block, #company .media-card, .special-card, .quality-points article, .credential-card'
    );
    targets.forEach(el => el.classList.add('reveal-ready'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold:.12, rootMargin:'0px 0px -7% 0px' });
    targets.forEach(el => io.observe(el));
  }

  if (!gsapReady || reduceMotion) {
    fallbackReveal();
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling on capable desktop devices. Native scrolling remains the fallback.
  let lenis = null;
  if (window.Lenis && finePointer && window.innerWidth > 900) {
    try {
      lenis = new window.Lenis({
        duration:1.12,
        smoothWheel:true,
        wheelMultiplier:.88,
        touchMultiplier:1.05
      });
      lenis.on('scroll', () => {
        ScrollTrigger.update();
        updateChrome();
      });
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      lenis = null;
    }
  }

  // Hero entrance: editorial, restrained and fast enough to preserve perceived performance.
  const heroTl = gsap.timeline({ defaults:{ ease:'power3.out' } });
  heroTl
    .from('.hero .eyebrow', { autoAlpha:0, y:18, duration:.55 })
    .from('.hero h1', {
      autoAlpha:0,
      y:70,
      clipPath:'inset(100% 0 0 0)',
      duration:1.05,
      clearProps:'clipPath'
    }, '-=.28')
    .from('.hero p', { autoAlpha:0, y:26, duration:.65 }, '-=.55')
    .from('.hero-actions .btn', { autoAlpha:0, y:18, stagger:.08, duration:.5 }, '-=.42')
    .from('.hero-facts > div', { autoAlpha:0, y:20, stagger:.08, duration:.5 }, '-=.28');

  gsap.to('.hero-image img', {
    scale:1.2,
    yPercent:11,
    ease:'none',
    scrollTrigger:{
      trigger:'.hero',
      start:'top top',
      end:'bottom top',
      scrub:1
    }
  });
  gsap.to('.hero-glow', {
    xPercent:5,
    yPercent:-4,
    scale:1.08,
    ease:'none',
    scrollTrigger:{
      trigger:'.hero',
      start:'top top',
      end:'bottom top',
      scrub:1.4
    }
  });
  gsap.to('.hero-content', {
    yPercent:-7,
    autoAlpha:.5,
    ease:'none',
    scrollTrigger:{
      trigger:'.hero',
      start:'45% top',
      end:'bottom top',
      scrub:1
    }
  });

  // Editorial reveal system.
  const revealTargets = gsap.utils.toArray(
    '.section-heading, #company .copy-block, #company .media-card, .standard-card, .special-card, .quality-points article, .credential-card'
  );
  revealTargets.forEach((el, index) => {
    gsap.from(el, {
      autoAlpha:0,
      y:52,
      duration:.9,
      delay:(index % 3) * .035,
      ease:'power3.out',
      scrollTrigger:{
        trigger:el,
        start:'top 87%',
        once:true
      }
    });
  });

  // Company image gets a slow editorial crop.
  gsap.fromTo('#company .media-card img',
    { scale:1.12, yPercent:-3 },
    {
      scale:1.02,
      yPercent:3,
      ease:'none',
      scrollTrigger:{
        trigger:'#company',
        start:'top bottom',
        end:'bottom top',
        scrub:1.1
      }
    }
  );

  // Pinned story: origin → harvest → preparation → export.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1001px)', () => {
    const frames = gsap.utils.toArray('.story-frame');
    const steps = gsap.utils.toArray('.story-step');
    if (frames.length < 4 || steps.length < 4) return;

    gsap.set(frames, { autoAlpha:0, scale:1.04 });
    gsap.set(frames[0], { autoAlpha:1, scale:1 });
    gsap.set(steps, { autoAlpha:0, y:44 });
    gsap.set(steps[0], { autoAlpha:1, y:0 });
    gsap.set('.story-rail-fill', { scaleX:.25 });

    const story = gsap.timeline({
      defaults:{ ease:'none' },
      scrollTrigger:{
        trigger:'.cinematic-story',
        start:'top top',
        end:() => '+=' + Math.round(window.innerHeight * 4.1),
        scrub:1.05,
        pin:'.story-pin',
        anticipatePin:1,
        invalidateOnRefresh:true
      }
    });

    // Slow camera movement throughout each scene.
    story.to(frames[0].querySelector('img'), {
      scale:1.14,
      xPercent:-2.2,
      duration:1.05
    }, 0);

    for (let i=1; i<frames.length; i++) {
      const at = i * 1.1;
      const previousFrame = frames[i-1];
      const currentFrame = frames[i];
      const previousStep = steps[i-1];
      const currentStep = steps[i];
      const image = currentFrame.querySelector('img');

      story
        .to(previousStep, {
          autoAlpha:0,
          y:-34,
          duration:.28,
          ease:'power2.in'
        }, at)
        .to(previousFrame, {
          autoAlpha:0,
          scale:.98,
          duration:.38
        }, at)
        .fromTo(currentFrame,
          { autoAlpha:0, scale:1.065 },
          { autoAlpha:1, scale:1, duration:.48 },
          at+.06
        )
        .fromTo(currentStep,
          { autoAlpha:0, y:42 },
          { autoAlpha:1, y:0, duration:.42, ease:'power3.out' },
          at+.12
        )
        .to('.story-rail-fill', {
          scaleX:(i+1)/frames.length,
          duration:.45
        }, at+.05)
        .fromTo(image,
          { scale:1.13, xPercent:i % 2 ? 2.2 : -2.2 },
          { scale:1.03, xPercent:i % 2 ? -1.2 : 1.2, duration:1.05 },
          at+.05
        );
    }

    gsap.to('.story-watermark', {
      xPercent:-12,
      ease:'none',
      scrollTrigger:{
        trigger:'.cinematic-story',
        start:'top top',
        end:() => '+=' + Math.round(window.innerHeight * 4.1),
        scrub:1.2
      }
    });

    return () => {
      story.scrollTrigger && story.scrollTrigger.kill();
      story.kill();
    };
  });

  // Products enter from opposite directions, keeping the page from feeling template-like.
  const productCards = gsap.utils.toArray('.standard-card');
  productCards.forEach((card, i) => {
    gsap.from(card, {
      xPercent:i % 2 ? 10 : -10,
      rotation:i % 2 ? 1.5 : -1.5,
      autoAlpha:0,
      duration:1,
      ease:'power3.out',
      scrollTrigger:{
        trigger:card,
        start:'top 88%',
        once:true
      }
    });
  });

  // Full-width origin image has a cinematic crop shift.
  gsap.fromTo('.photo-band img',
    { scale:1.13, yPercent:-6 },
    {
      scale:1.06,
      yPercent:6,
      ease:'none',
      scrollTrigger:{
        trigger:'.photo-band',
        start:'top bottom',
        end:'bottom top',
        scrub:1.1
      }
    }
  );
  gsap.from('.photo-band-copy > *', {
    autoAlpha:0,
    y:45,
    stagger:.12,
    duration:.8,
    ease:'power3.out',
    scrollTrigger:{
      trigger:'.photo-band',
      start:'top 72%',
      once:true
    }
  });

  // Subtle depth on high-value cards.
  if (finePointer) {
    document.querySelectorAll('.standard-card, .credential-card').forEach(card => {
      gsap.set(card, { transformPerspective:1000, transformStyle:'preserve-3d' });
      const rx = gsap.quickTo(card, 'rotationX', { duration:.35, ease:'power3.out' });
      const ry = gsap.quickTo(card, 'rotationY', { duration:.35, ease:'power3.out' });
      const lift = gsap.quickTo(card, 'y', { duration:.3, ease:'power3.out' });

      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - .5;
        const ny = (event.clientY - rect.top) / rect.height - .5;
        rx(-ny * 3.2);
        ry(nx * 3.2);
        lift(-7);
      });
      card.addEventListener('pointerleave', () => {
        rx(0); ry(0); lift(0);
      });
    });

    // Magnetic CTAs: small movement only, so buttons remain easy to target.
    document.querySelectorAll('.magnetic').forEach(button => {
      const qx = gsap.quickTo(button, 'x', { duration:.35, ease:'power3.out' });
      const qy = gsap.quickTo(button, 'y', { duration:.35, ease:'power3.out' });
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        qx((event.clientX - rect.left - rect.width/2) * .12);
        qy((event.clientY - rect.top - rect.height/2) * .18);
      });
      button.addEventListener('pointerleave', () => {
        qx(0); qy(0);
      });
    });
  }

  // Recalculate pinned distances after fonts, images or language changes.
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once:true });
  document.getElementById('language-select')?.addEventListener('change', () => {
    setTimeout(() => ScrollTrigger.refresh(), 80);
  });
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) img.addEventListener('load', () => ScrollTrigger.refresh(), { once:true });
  });
})();
