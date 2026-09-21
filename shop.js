(() => {
  'use strict';

  /* ---------------------------------------------------------
     True door storytelling: only one page exists visually.
     The previous long pinned ScrollTrigger story is disabled.
  --------------------------------------------------------- */
  const story = document.querySelector('#vanilla-journey');
  const storyPin = story?.querySelector('.story-pin');
  const frames = story ? [...story.querySelectorAll('.story-frame')] : [];
  const steps = story ? [...story.querySelectorAll('.story-step')] : [];
  const railDots = story ? [...story.querySelectorAll('.story-rail i')] : [];
  const railFill = story?.querySelector('.story-rail-fill');
  let storyIndex = 0;
  let storyBusy = false;

  function disableOldStoryScroll() {
    if (!window.ScrollTrigger || !story) return;
    window.ScrollTrigger.getAll().forEach(trigger => {
      const triggerEl = trigger.trigger;
      const pinEl = trigger.pin;
      if (triggerEl === story || pinEl === storyPin || triggerEl?.closest?.('#vanilla-journey')) {
        try { trigger.kill(true); } catch (e) {}
      }
    });
    if (storyPin) {
      storyPin.style.position = '';
      storyPin.style.top = '';
      storyPin.style.transform = '';
    }
    window.ScrollTrigger.refresh();
  }

  function updateStoryUi() {
    frames.forEach((el, i) => {
      if (i === storyIndex && !storyBusy) el.classList.add('is-active');
      else if (!el.classList.contains('is-door-out') && !el.classList.contains('is-door-out-back') && !el.classList.contains('is-door-in') && !el.classList.contains('is-door-prep') && !el.classList.contains('is-door-prep-back')) el.classList.remove('is-active');
    });
    steps.forEach((el, i) => el.classList.toggle('is-active', i === storyIndex));
    railDots.forEach((el, i) => el.classList.toggle('is-active', i === storyIndex));
    if (railFill) railFill.style.transform = 'scaleX(' + ((storyIndex + 1) / Math.max(frames.length, 1)) + ')';
    const prev = storyPin?.querySelector('[data-story-prev]');
    const next = storyPin?.querySelector('[data-story-next]');
    if (prev) prev.disabled = storyIndex === 0;
    if (next) next.disabled = storyIndex === frames.length - 1;
  }

  function goStory(target) {
    if (storyBusy || target === storyIndex || target < 0 || target >= frames.length) return;
    storyBusy = true;
    const forward = target > storyIndex;
    const current = frames[storyIndex];
    const incoming = frames[target];

    frames.forEach((el, i) => {
      if (el !== current && el !== incoming) {
        el.classList.remove('is-active','is-door-in','is-door-out','is-door-out-back','is-door-prep','is-door-prep-back');
      }
    });

    current.classList.add(forward ? 'is-door-out' : 'is-door-out-back');
    current.classList.remove('is-active');

    incoming.classList.add(forward ? 'is-door-prep' : 'is-door-prep-back');
    incoming.offsetWidth;

    storyIndex = target;
    steps.forEach((el, i) => el.classList.toggle('is-active', i === storyIndex));
    railDots.forEach((el, i) => el.classList.toggle('is-active', i === storyIndex));
    if (railFill) railFill.style.transform = 'scaleX(' + ((storyIndex + 1) / frames.length) + ')';

    requestAnimationFrame(() => {
      incoming.classList.remove('is-door-prep','is-door-prep-back');
      incoming.classList.add('is-door-in');
    });

    setTimeout(() => {
      current.classList.remove('is-door-out','is-door-out-back');
      incoming.classList.remove('is-door-in');
      incoming.classList.add('is-active');
      storyBusy = false;
      updateStoryUi();
    }, 780);
  }

  if (story && storyPin && frames.length) {
    setTimeout(disableOldStoryScroll, 30);
    window.addEventListener('load', () => setTimeout(disableOldStoryScroll, 80), {once:true});

    frames.forEach((el, i) => el.classList.toggle('is-active', i === 0));
    steps.forEach((el, i) => el.classList.toggle('is-active', i === 0));

    const controls = document.createElement('div');
    controls.className = 'story-door-hint';
    controls.innerHTML = '<button type="button" data-story-prev aria-label="Page précédente">↑</button><button type="button" data-story-next aria-label="Page suivante">↓</button>';
    storyPin.appendChild(controls);
    controls.querySelector('[data-story-prev]').addEventListener('click', () => goStory(storyIndex - 1));
    controls.querySelector('[data-story-next]').addEventListener('click', () => goStory(storyIndex + 1));
    railDots.forEach((dot, i) => dot.addEventListener('click', () => goStory(i)));

    storyPin.addEventListener('wheel', event => {
      if (Math.abs(event.deltaY) < 8 || storyBusy) return;
      if (event.deltaY > 0 && storyIndex < frames.length - 1) {
        event.preventDefault();
        goStory(storyIndex + 1);
      } else if (event.deltaY < 0 && storyIndex > 0) {
        event.preventDefault();
        goStory(storyIndex - 1);
      }
    }, {passive:false});

    let touchY = null;
    storyPin.addEventListener('touchstart', e => { touchY = e.touches[0]?.clientY ?? null; }, {passive:true});
    storyPin.addEventListener('touchend', e => {
      if (touchY == null) return;
      const y = e.changedTouches[0]?.clientY ?? touchY;
      const dy = touchY - y;
      touchY = null;
      if (Math.abs(dy) < 50) return;
      if (dy > 0) goStory(storyIndex + 1);
      else goStory(storyIndex - 1);
    }, {passive:true});

    updateStoryUi();
  }

  /* ---------------------------------------------------------
     Shop + multi-product cart
  --------------------------------------------------------- */
  const cartKey = 'cfood-shop-cart-v1';
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem(cartKey) || '{}') || {}; } catch (e) { cart = {}; }

  const cartRoot = document.querySelector('.shop-cart');
  const cartItems = document.querySelector('.cart-items');
  const cartEmpty = document.querySelector('.cart-empty');
  const cartCount = [...document.querySelectorAll('.cart-count')];
  const checkoutModal = document.querySelector('.checkout-modal');
  const checkoutSummary = document.querySelector('.checkout-summary');
  const checkoutHidden = document.querySelector('#checkout-cart-summary');
  const checkoutOpen = document.querySelector('.checkout-open');

  function persistCart() {
    try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch (e) {}
  }

  function totalItems() {
    return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  }

  function summaryText() {
    const lines = Object.values(cart).map(item => `${item.name} — ${item.qty} ${item.unit}`);
    return lines.length ? lines.join('\n') : 'Panier vide';
  }

  function renderCart() {
    const items = Object.values(cart);
    cartCount.forEach(el => el.textContent = totalItems());
    if (cartEmpty) cartEmpty.hidden = items.length > 0;
    if (checkoutOpen) checkoutOpen.disabled = items.length === 0;
    if (!cartItems) return;

    cartItems.innerHTML = items.map(item => `
      <div class="cart-row" data-cart-id="${item.id}">
        <div>
          <strong>${item.name}</strong>
          <small>Quantité en ${item.unit}</small>
          <button type="button" class="cart-remove" data-remove="${item.id}">Retirer</button>
        </div>
        <div class="cart-qty">
          <button type="button" data-minus="${item.id}" aria-label="Diminuer">−</button>
          <b>${item.qty}</b>
          <button type="button" data-plus="${item.id}" aria-label="Augmenter">+</button>
        </div>
      </div>
    `).join('');

    if (checkoutSummary) checkoutSummary.textContent = summaryText();
    if (checkoutHidden) checkoutHidden.value = summaryText();
  }

  function openCart() {
    if (!cartRoot) return;
    cartRoot.classList.add('is-open');
    cartRoot.setAttribute('aria-hidden','false');
    document.body.classList.add('shop-lock');
  }
  function closeCart() {
    cartRoot?.classList.remove('is-open');
    cartRoot?.setAttribute('aria-hidden','true');
    if (!checkoutModal?.classList.contains('is-open')) document.body.classList.remove('shop-lock');
  }
  function openCheckout() {
    if (!Object.keys(cart).length || !checkoutModal) return;
    closeCart();
    if (checkoutSummary) checkoutSummary.textContent = summaryText();
    if (checkoutHidden) checkoutHidden.value = summaryText();
    checkoutModal.classList.add('is-open');
    checkoutModal.setAttribute('aria-hidden','false');
    document.body.classList.add('shop-lock');
  }
  function closeCheckout() {
    checkoutModal?.classList.remove('is-open');
    checkoutModal?.setAttribute('aria-hidden','true');
    document.body.classList.remove('shop-lock');
  }

  document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.shop-card');
      if (!card) return;
      const id = card.dataset.id;
      if (!id) return;
      const current = cart[id] || {id, name:card.dataset.name || id, unit:card.dataset.unit || 'unité', qty:0};
      current.qty += 1;
      cart[id] = current;
      persistCart();
      renderCart();
      button.textContent = 'Ajouté ✓';
      setTimeout(() => { button.textContent = 'Ajouter au panier'; }, 900);
    });
  });

  document.querySelectorAll('.cart-open').forEach(button => button.addEventListener('click', openCart));
  document.querySelectorAll('[data-cart-close]').forEach(button => button.addEventListener('click', closeCart));
  document.querySelectorAll('[data-checkout-close]').forEach(button => button.addEventListener('click', closeCheckout));
  checkoutOpen?.addEventListener('click', openCheckout);

  cartItems?.addEventListener('click', event => {
    const plus = event.target.closest('[data-plus]');
    const minus = event.target.closest('[data-minus]');
    const remove = event.target.closest('[data-remove]');
    const id = plus?.dataset.plus || minus?.dataset.minus || remove?.dataset.remove;
    if (!id || !cart[id]) return;
    if (plus) cart[id].qty += 1;
    if (minus) cart[id].qty -= 1;
    if (remove || cart[id].qty <= 0) delete cart[id];
    persistCart();
    renderCart();
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeCart();
    closeCheckout();
  });

  renderCart();

  /* ---------------------------------------------------------
     Original lightweight 8-bit shop ambience (not Pokémon audio).
     Starts only after explicit user interaction.
  --------------------------------------------------------- */
  const musicButton = document.querySelector('.shop-music');
  let audioCtx = null;
  let musicTimer = null;
  let musicStep = 0;
  const notes = [261.63,329.63,392.00,523.25,392.00,329.63,293.66,349.23,440.00,587.33,440.00,349.23];

  function playMusicNote() {
    if (!audioCtx || audioCtx.state !== 'running') return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = musicStep % 4 === 0 ? 'square' : 'triangle';
    osc.frequency.value = notes[musicStep % notes.length];
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.24);
    musicStep++;
  }

  function startMusic() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audioCtx) audioCtx = new AC();
    audioCtx.resume();
    if (musicTimer) return;
    playMusicNote();
    musicTimer = setInterval(playMusicNote, 260);
    musicButton?.setAttribute('aria-pressed','true');
  }

  function stopMusic() {
    if (musicTimer) clearInterval(musicTimer);
    musicTimer = null;
    musicButton?.setAttribute('aria-pressed','false');
  }

  musicButton?.addEventListener('click', () => {
    if (musicTimer) stopMusic();
    else startMusic();
  });
})();