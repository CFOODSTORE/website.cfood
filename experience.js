document.documentElement.classList.add('js');

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress span');
  const floating = document.querySelector('.floating-rfq');
  const requests = document.getElementById('requests');
  const soundToggle = document.querySelector('.sound-toggle');
  const gsapReady = Boolean(window.gsap && window.ScrollTrigger);

  /* ---------------------------------------------------------
     Ambient interaction soundscape — Web Audio only.
     No audio file is downloaded; sounds are synthesized locally.
     Browsers only allow sound after a real user interaction.
  --------------------------------------------------------- */
  let soundEnabled = true;
  try {
    const savedSound = localStorage.getItem('cfood-sound');
    if (savedSound === 'off') soundEnabled = false;
  } catch (e) {}

  let audioContext = null;
  let noiseBuffer = null;
  let interactionArmed = false;
  let lastTransitionAt = 0;
  let lastSwipeAt = 0;

  function updateSoundToggle() {
    if (!soundToggle) return;
    soundToggle.setAttribute('aria-pressed', String(soundEnabled));
    soundToggle.setAttribute('aria-label', soundEnabled ? 'Sound on' : 'Sound off');
    soundToggle.setAttribute('title', soundEnabled ? 'Sound on' : 'Sound off');
    soundToggle.classList.toggle('is-armed', soundEnabled && interactionArmed);
  }

  function getAudioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor || !soundEnabled || !interactionArmed) return null;
    if (!audioContext) {
      audioContext = new AudioCtor();
      noiseBuffer = audioContext.createBuffer(1, Math.round(audioContext.sampleRate * 1.15), audioContext.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const fade = 1 - (i / data.length);
        data[i] = (Math.random() * 2 - 1) * (.72 + fade * .28);
      }
    }
    return audioContext;
  }

  function withAudio(callback) {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => callback(ctx)).catch(() => {});
    } else {
      callback(ctx);
    }
  }

  function playClick(strength = 1) {
    withAudio(ctx => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(510, now + .055);
      filter.type = 'lowpass';
      filter.frequency.value = 1800;
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(.032 * strength, now + .006);
      gain.gain.exponentialRampToValueAtTime(.0001, now + .075);
      osc.connect(filter).connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + .08);
    });
  }

  function playSwipe(direction = 1, intensity = 1) {
    const nowMs = performance.now();
    if (nowMs - lastSwipeAt < 190) return;
    lastSwipeAt = nowMs;
    withAudio(ctx => {
      const now = ctx.currentTime;
      const source = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null;

      source.buffer = noiseBuffer;
      source.playbackRate.setValueAtTime(direction > 0 ? 1.08 : .9, now);
      filter.type = 'bandpass';
      filter.Q.value = .7;
      filter.frequency.setValueAtTime(direction > 0 ? 650 : 1600, now);
      filter.frequency.exponentialRampToValueAtTime(direction > 0 ? 2300 : 520, now + .34);

      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(.052 * intensity, now + .07);
      gain.gain.exponentialRampToValueAtTime(.0001, now + .42);

      source.connect(filter);
      if (panner) {
        panner.pan.setValueAtTime(direction > 0 ? -.34 : .34, now);
        panner.pan.linearRampToValueAtTime(direction > 0 ? .34 : -.34, now + .36);
        filter.connect(panner).connect(gain).connect(ctx.destination);
      } else {
        filter.connect(gain).connect(ctx.destination);
      }

      source.start(now, .04, .48);
      source.stop(now + .5);
    });
  }

  function playTransition(direction = 1) {
    const nowMs = performance.now();
    if (nowMs - lastTransitionAt < 480) return;
    lastTransitionAt = nowMs;
    playSwipe(direction, .7);
    withAudio(ctx => {
      const now = ctx.currentTime + .11;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(direction > 0 ? 330 : 440, now);
      osc.frequency.exponentialRampToValueAtTime(direction > 0 ? 470 : 310, now + .2);
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(.018, now + .035);
      gain.gain.exponentialRampToValueAtTime(.0001, now + .24);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + .25);
    });
  }

  function armInteraction() {
    interactionArmed = true;
    updateSoundToggle();
  }
  document.addEventListener('pointerdown', armInteraction, { once:true, capture:true });
  document.addEventListener('keydown', armInteraction, { once:true, capture:true });

  if (soundToggle) {
    soundToggle.addEventListener('click', event => {
      event.preventDefault();
      interactionArmed = true;
      soundEnabled = !soundEnabled;
      try { localStorage.setItem('cfood-sound', soundEnabled ? 'on' : 'off'); } catch (e) {}
      updateSoundToggle();
      if (soundEnabled) {
        playClick(.8);
        setTimeout(() => playSwipe(1, .35), 55);
      }
    });
  }
  updateSoundToggle();

  // Contextual click sounds: navigation transitions differ from ordinary controls.
  document.addEventListener('click', event => {
    const target = event.target.closest('a, button, input[type="submit"], .tab, .product-request');
    if (!target || target === soundToggle || target.closest('.sound-toggle')) return;
    interactionArmed = true;
    updateSoundToggle();

    target.classList.remove('sfx-pressed');
    void target.offsetWidth;
    target.classList.add('sfx-pressed');
    setTimeout(() => target.classList.remove('sfx-pressed'), 220);

    const href = target.getAttribute && target.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      const destination = document.querySelector(href);
      const direction = destination && destination.getBoundingClientRect().top < 0 ? -1 : 1;
      playTransition(direction);
    } else {
      playClick(target.matches('.btn,.nav-cta,.product-request') ? 1 : .7);
    }
  }, true);

  document.addEventListener('change', event => {
    if (event.target.matches('select')) playClick(.55);
  });

  /* ---------------------------------------------------------
     Welcome mini-film + page wipes
  --------------------------------------------------------- */
  const loader = document.querySelector('.site-loader');
  const introFilm = document.querySelector('.intro-film');
  const introSkip = document.querySelector('.intro-skip');
  const introFrames = [...document.querySelectorAll('.intro-film-frame')];
  const introBrand = document.querySelector('.intro-film-brand');
  const introProgress = document.querySelector('.intro-film-progress span');
  const pageWipe = document.querySelector('.page-wipe');
  let introTimeline = null;
  let introFinished = false;

  function markIntroSeen() {
    try { sessionStorage.setItem('cfood-intro-seen', '1'); } catch (e) {}
  }

  function introWasSeen() {
    try { return sessionStorage.getItem('cfood-intro-seen') === '1'; } catch (e) { return false; }
  }

  function finishIntro(immediate = false) {
    if (introFinished) return;
    introFinished = true;
    markIntroSeen();
    document.documentElement.classList.remove('intro-lock');
    if (introTimeline) introTimeline.kill();
    if (!introFilm) return;
    if (window.gsap && !immediate) {
      window.gsap.to(introFilm, {
        autoAlpha:0,
        duration:.55,
        ease:'power2.inOut',
        onComplete:() => introFilm.classList.remove('is-running')
      });
    } else {
      introFilm.classList.remove('is-running');
      introFilm.style.opacity='0';
      introFilm.style.visibility='hidden';
    }
  }

  function runIntroFilm() {
    if (!introFilm || reduceMotion || introWasSeen()) {
      finishIntro(true);
      return;
    }

    document.documentElement.classList.add('intro-lock');
    introFilm.classList.add('is-running');

    if (!window.gsap || introFrames.length < 3) {
      setTimeout(() => finishIntro(false), 2400);
      return;
    }

    const g = window.gsap;
    g.set(introFrames, {autoAlpha:0});
    g.set(introFrames[0], {autoAlpha:1});
    g.set('.intro-film-copy > *', {autoAlpha:0, y:28});
    g.set(introBrand, {autoAlpha:0, scale:.96});
    g.set(introProgress, {scaleX:0});

    introTimeline = g.timeline({
      defaults:{ease:'power3.out'},
      onComplete:() => finishIntro(false)
    });

    introTimeline
      .to(introProgress, {scaleX:1, duration:5.2, ease:'none'}, 0)
      .fromTo(introFrames[0].querySelector('img'), {scale:1.12}, {scale:1.03, duration:1.65, ease:'none'}, 0)
      .to(introFrames[0].querySelectorAll('.intro-film-copy > *'), {autoAlpha:1, y:0, stagger:.09, duration:.5}, .18)
      .to(introFrames[0], {autoAlpha:0, duration:.35}, 1.35)
      .fromTo(introFrames[1], {autoAlpha:0}, {autoAlpha:1, duration:.4}, 1.3)
      .fromTo(introFrames[1].querySelector('img'), {scale:1.13, xPercent:2}, {scale:1.03, xPercent:-1, duration:1.55, ease:'none'}, 1.3)
      .to(introFrames[1].querySelectorAll('.intro-film-copy > *'), {autoAlpha:1, y:0, stagger:.09, duration:.5}, 1.46)
      .add(() => playSwipe(1,.45), 1.38)
      .to(introFrames[1], {autoAlpha:0, duration:.35}, 2.75)
      .fromTo(introFrames[2], {autoAlpha:0}, {autoAlpha:1, duration:.4}, 2.7)
      .fromTo(introFrames[2].querySelector('img'), {scale:1.13, xPercent:-2}, {scale:1.03, xPercent:1, duration:1.5, ease:'none'}, 2.7)
      .to(introFrames[2].querySelectorAll('.intro-film-copy > *'), {autoAlpha:1, y:0, stagger:.09, duration:.5}, 2.86)
      .add(() => playSwipe(1,.45), 2.78)
      .to(introFrames[2], {autoAlpha:.25, duration:.45}, 4.0)
      .to(introBrand, {autoAlpha:1, scale:1, duration:.65}, 4.0)
      .add(() => playTransition(1), 4.05)
      .to({}, {duration:.55});
  }

  if (introSkip) {
    introSkip.addEventListener('click', () => finishIntro(false));
  }

  let loaderReleased = false;
  function releaseLoader() {
    if (loaderReleased) return;
    loaderReleased = true;
    if (loader) loader.classList.add('is-done');
    setTimeout(runIntroFilm, 260);
  }

  if (document.readyState === 'complete') {
    setTimeout(releaseLoader, 260);
  } else {
    window.addEventListener('load', () => setTimeout(releaseLoader, 240), {once:true});
    setTimeout(releaseLoader, 1500);
  }

  // Internal navigation: keep the cinematic sound cue, but use reliable smooth scrolling.
  // The former full-screen page wipe could remain visible after an interrupted animation.
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href === '#top') return;
    const destination = document.querySelector(href);
    if (!destination) return;

    event.preventDefault();
    const direction = destination.getBoundingClientRect().top < 0 ? -1 : 1;
    playTransition(direction);
    const top = destination.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0);
    window.scrollTo({top, behavior:reduceMotion ? 'auto' : 'smooth'});
  }, false);

  /* ---------------------------------------------------------
     Section gating: chapters remain visually hidden until the
     visitor physically reaches them. They hide again off-screen.
  --------------------------------------------------------- */
  const chapterSelector = [
    '.trust-strip',
    '#company',
    '.cinematic-story',
    '#products',
    '#special',
    '#quality',
    '.photo-band',
    '#compliance',
    '#requests',
    '.site-footer'
  ].join(',');

  const chapters = [...document.querySelectorAll(chapterSelector)];
  let activeSoundChapter = null;
  let previousChapterTop = 0;

  chapters.forEach(chapter => {
    const rect = chapter.getBoundingClientRect();
    if (rect.top < window.innerHeight * .98 && rect.bottom > 0) chapter.classList.add('section-active');
    chapter.classList.add('section-gated');
  });

  if ('IntersectionObserver' in window) {
    const chapterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const chapter = entry.target;
        if (entry.isIntersecting) {
          chapter.classList.add('section-active');
          chapter.classList.remove('section-leaving');

          if (entry.intersectionRatio >= .18 && chapter !== activeSoundChapter) {
            const top = chapter.getBoundingClientRect().top;
            const direction = top >= previousChapterTop ? 1 : -1;
            previousChapterTop = top;
            activeSoundChapter = chapter;
            playTransition(direction);
          }
        } else {
          chapter.classList.remove('section-active');
          chapter.classList.remove('section-leaving');
          if (chapter === activeSoundChapter) activeSoundChapter = null;
        }
      });
    }, {
      threshold:[0,.04,.18,.4,.7],
      rootMargin:'7% 0px 7% 0px'
    });
    chapters.forEach(chapter => chapterObserver.observe(chapter));
  } else {
    chapters.forEach(chapter => chapter.classList.add('section-active'));
  }

  /* Basic chrome + floating RFQ behavior */
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

  // Hero entrance.
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

  // Editorial reveal system inside each newly visible chapter.
  const revealTargets = gsap.utils.toArray(
    '.section-heading, #company .copy-block, #company .media-card, .special-card, .quality-points article, .credential-card'
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

  // Pinned story: each chapter is a hidden full-screen page.
  // Pages replace each other with a 3D rotation instead of exposing the next section.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1001px)', () => {
    const frames = gsap.utils.toArray('.story-frame');
    const steps = gsap.utils.toArray('.story-step');
    if (frames.length < 4 || steps.length < 4) return;

    const headerHeight = () => Math.round(header?.getBoundingClientRect().height || 82);
    const storyDistance = () => Math.round(Math.max(window.innerHeight - headerHeight(), 620) * 4.15);

    gsap.set(frames, {
      autoAlpha:0,
      rotationY:90,
      transformPerspective:1500,
      transformOrigin:'50% 50%',
      scale:1.025
    });
    gsap.set(frames[0], { autoAlpha:1, rotationY:0, scale:1 });
    gsap.set(steps, {
      autoAlpha:0,
      rotationY:28,
      x:44,
      transformPerspective:1200,
      transformOrigin:'100% 50%'
    });
    gsap.set(steps[0], { autoAlpha:1, rotationY:0, x:0 });
    gsap.set('.story-rail-fill', { scaleX:.25 });

    let storySceneIndex = 0;

    const story = gsap.timeline({
      defaults:{ ease:'power2.inOut' },
      scrollTrigger:{
        trigger:'.cinematic-story',
        start:() => 'top ' + headerHeight() + 'px',
        end:() => '+=' + storyDistance(),
        scrub:.75,
        pin:'.story-pin',
        pinSpacing:true,
        anticipatePin:1,
        invalidateOnRefresh:true,
        onUpdate:self => {
          const nextIndex = Math.min(3, Math.floor(self.progress * 4));
          if (nextIndex !== storySceneIndex) {
            const direction = nextIndex > storySceneIndex ? 1 : -1;
            storySceneIndex = nextIndex;
            playSwipe(direction, .85);
          }
        }
      }
    });

    story.to(frames[0].querySelector('img'), {
      scale:1.085,
      duration:1.05,
      ease:'none'
    }, 0);

    for (let i=1; i<frames.length; i++) {
      const at = i * 1.12;
      const previousFrame = frames[i-1];
      const currentFrame = frames[i];
      const previousStep = steps[i-1];
      const currentStep = steps[i];
      const image = currentFrame.querySelector('img');

      story
        .to(previousStep, {
          autoAlpha:0,
          rotationY:-28,
          x:-44,
          duration:.34
        }, at)
        .to(previousFrame, {
          autoAlpha:0,
          rotationY:-90,
          scale:1.025,
          duration:.5
        }, at)
        .fromTo(currentFrame,
          { autoAlpha:0, rotationY:90, scale:1.025 },
          { autoAlpha:1, rotationY:0, scale:1, duration:.56 },
          at+.06
        )
        .fromTo(currentStep,
          { autoAlpha:0, rotationY:28, x:44 },
          { autoAlpha:1, rotationY:0, x:0, duration:.46, ease:'power3.out' },
          at+.16
        )
        .to('.story-rail-fill', {
          scaleX:(i+1)/frames.length,
          duration:.44,
          ease:'power2.out'
        }, at+.08)
        .fromTo(image,
          { scale:1.09 },
          { scale:1.025, duration:1.05, ease:'none' },
          at+.08
        );
    }

    return () => {
      story.scrollTrigger && story.scrollTrigger.kill();
      story.kill();
    };
  });

  // Products enter from opposite directions.
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

  // Subtle pointer depth and magnetic buttons.
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

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once:true });
  document.getElementById('language-select')?.addEventListener('change', () => {
    setTimeout(() => ScrollTrigger.refresh(), 80);
  });
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) img.addEventListener('load', () => ScrollTrigger.refresh(), { once:true });
  });
})();
