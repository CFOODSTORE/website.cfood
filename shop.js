(() => {
  'use strict';

  const PRODUCTS = [
    {id:'grade-a',name:'Gousses Bourbon Grade A / Gourmet',unit:'kg',badge:'Grade A · Gourmet',title:'Gousses Bourbon Premium',text:'Gousses entières sélectionnées pour gastronomie, pâtisserie et distribution premium.',visual:'photo',image:'assets/hero-beans.webp'},
    {id:'grade-b',name:'Gousses Grade B / Extraction',unit:'kg',badge:'Grade B · Extraction',title:'Vanille pour extraction',text:"Lots destinés aux fabricants d'arômes, extracteurs et applications industrielles.",visual:'photo',image:'assets/crystal-beans.webp'},
    {id:'extract-1l',name:'Extrait de vanille de Madagascar 1L',unit:'bouteille',badge:'Extrait · 1L',title:'Extrait de vanille',text:"Format professionnel d'un litre pour usages alimentaires et transformation.",visual:'extract'},
    {id:'powder',name:'Poudre de vanille de Madagascar',unit:'kg',badge:'Poudre',title:'Poudre de vanille',text:'Vanille moulue pour formulation, pâtisserie et applications professionnelles.',visual:'powder'},
    {id:'seeds',name:'Graines de vanille',unit:'kg',badge:'Graines',title:'Graines de vanille',text:'Pour préparations, inclusions et applications de transformation.',visual:'seeds'},
    {id:'organic-nop',name:'Vanille Organic / NOP',unit:'kg',badge:'Certification sur lot',title:'Organic / NOP',text:'Lots certifiés proposés selon disponibilité et vérification documentaire.',visual:'photo',image:'assets/green-vine.webp'},
    {id:'fairtrade',name:'Vanille Fairtrade',unit:'kg',badge:'Certification sur lot',title:'Fairtrade',text:"Vanille certifiée Fairtrade lorsqu'un lot éligible est disponible.",visual:'photo',image:'assets/green-basket.webp'},
    {id:'oleoresin',name:'Oléorésine / Concentré de vanille',unit:'kg',badge:'Concentré',title:'Oléorésine / Concentrés',text:'Demande technique selon fold, support, solvant et spécifications analytiques.',visual:'oleo'},
    {id:'custom',name:'Lot sur mesure & conditionnement',unit:'lot',badge:'Sur mesure',title:'Lot & conditionnement personnalisé',text:'Longueur, humidité, emballage sous vide, conditionnement industriel ou programme récurrent.',visual:'photo',image:'assets/green-hand.webp'}
  ];

  function visualMarkup(product){
    if(product.visual === 'photo') return '<div class="shop-visual photo-visual" style="--shop-bg:url(\''+product.image+'\')"><img src="'+product.image+'" alt="'+product.title+'"></div>';
    if(product.visual === 'extract') return '<div class="shop-visual extract-visual" role="img" aria-label="Extrait de vanille Challenge Food 1 litre"><div class="extract-bottle"><div class="extract-cap"></div><div class="extract-neck"></div><div class="extract-body"><div class="extract-label"><span>Challenge Food.</span><strong>EXTRAIT DE VANILLE</strong><small>DE MADAGASCAR</small><b>1L</b></div></div></div></div>';
    if(product.visual === 'powder') return '<div class="shop-visual powder-visual" role="img" aria-label="Poudre de vanille"><span class="powder-mound"></span><i></i></div>';
    if(product.visual === 'seeds') return '<div class="shop-visual seeds-visual" role="img" aria-label="Graines de vanille"><span class="seeds-mound"></span></div>';
    if(product.visual === 'oleo') return '<div class="shop-visual oleo-visual" role="img" aria-label="Oléorésine et concentré de vanille"><span class="oleo-drum">10×</span></div>';
    return '';
  }

  const catalog = document.getElementById('shop-catalog');
  if(catalog){
    catalog.innerHTML = PRODUCTS.map(product => (
      '<article class="shop-card" data-id="'+product.id+'" data-name="'+product.name+'" data-unit="'+product.unit+'">'+
        visualMarkup(product)+
        '<div class="shop-card-copy"><span class="shop-badge">'+product.badge+'</span><h3>'+product.title+'</h3><p>'+product.text+'</p>'+
        '<div class="shop-card-bottom"><span class="shop-price">Prix sur devis</span><button class="add-cart" type="button">Ajouter au panier</button></div></div>'+
      '</article>'
    )).join('');
  }

  const industrialProduct = document.getElementById('industrial-product');
  if(industrialProduct){
    industrialProduct.innerHTML = PRODUCTS.map(p => '<option value="'+p.name+'">'+p.name+'</option>').join('');
  }

  /* Story inside the Origine page: one scene at a time, hinged like a door. */
  const story = document.querySelector('#vanilla-journey');
  const storyPin = story?.querySelector('.story-pin');
  const frames = story ? [...story.querySelectorAll('.story-frame')] : [];
  const steps = story ? [...story.querySelectorAll('.story-step')] : [];
  const railDots = story ? [...story.querySelectorAll('.story-rail i')] : [];
  const railFill = story?.querySelector('.story-rail-fill');
  let storyIndex = 0;
  let storyBusy = false;

  function updateStoryUi(){
    frames.forEach((el,i)=>{
      if(i===storyIndex && !storyBusy) el.classList.add('is-active');
      else if(!el.matches('.is-door-in,.is-door-out,.is-door-out-back,.is-door-prep,.is-door-prep-back')) el.classList.remove('is-active');
    });
    steps.forEach((el,i)=>el.classList.toggle('is-active',i===storyIndex));
    railDots.forEach((el,i)=>el.classList.toggle('is-active',i===storyIndex));
    if(railFill) railFill.style.transform='scaleX('+((storyIndex+1)/Math.max(frames.length,1))+')';
    const prev=storyPin?.querySelector('[data-story-prev]');
    const next=storyPin?.querySelector('[data-story-next]');
    if(prev) prev.disabled=storyIndex===0;
    if(next) next.disabled=storyIndex===frames.length-1;
  }

  function goStory(target){
    if(storyBusy || target===storyIndex || target<0 || target>=frames.length) return;
    storyBusy=true;
    const forward=target>storyIndex;
    const current=frames[storyIndex], incoming=frames[target];
    frames.forEach(el=>{ if(el!==current && el!==incoming) el.classList.remove('is-active','is-door-in','is-door-out','is-door-out-back','is-door-prep','is-door-prep-back'); });
    current.classList.remove('is-active');
    current.classList.add(forward?'is-door-out':'is-door-out-back');
    incoming.classList.add(forward?'is-door-prep':'is-door-prep-back');
    void incoming.offsetWidth;
    storyIndex=target;
    steps.forEach((el,i)=>el.classList.toggle('is-active',i===storyIndex));
    railDots.forEach((el,i)=>el.classList.toggle('is-active',i===storyIndex));
    if(railFill) railFill.style.transform='scaleX('+((storyIndex+1)/frames.length)+')';
    requestAnimationFrame(()=>{incoming.classList.remove('is-door-prep','is-door-prep-back');incoming.classList.add('is-door-in');});
    setTimeout(()=>{
      current.classList.remove('is-door-out','is-door-out-back');
      incoming.classList.remove('is-door-in');
      incoming.classList.add('is-active');
      storyBusy=false;
      updateStoryUi();
    },780);
  }

  if(storyPin && frames.length){
    frames.forEach((el,i)=>el.classList.toggle('is-active',i===0));
    steps.forEach((el,i)=>el.classList.toggle('is-active',i===0));
    if(!storyPin.querySelector('.story-door-hint')){
      const controls=document.createElement('div');
      controls.className='story-door-hint';
      controls.innerHTML='<button type="button" data-story-prev aria-label="Étape précédente">←</button><button type="button" data-story-next aria-label="Étape suivante">→</button>';
      storyPin.appendChild(controls);
      controls.querySelector('[data-story-prev]').addEventListener('click',()=>goStory(storyIndex-1));
      controls.querySelector('[data-story-next]').addEventListener('click',()=>goStory(storyIndex+1));
    }
    railDots.forEach((dot,i)=>dot.addEventListener('click',()=>goStory(i)));
    updateStoryUi();
  }

  /* Cart */
  const cartKey='cfood-shop-cart-v2';
  let cart={};
  try{cart=JSON.parse(localStorage.getItem(cartKey)||'{}')||{};}catch(e){cart={};}
  const cartRoot=document.querySelector('.shop-cart');
  const cartItems=document.querySelector('.cart-items');
  const cartEmpty=document.querySelector('.cart-empty');
  const cartCount=[...document.querySelectorAll('.cart-count')];
  const checkoutModal=document.querySelector('.checkout-modal');
  const checkoutSummary=document.querySelector('.checkout-summary');
  const checkoutHidden=document.querySelector('#checkout-cart-summary');
  const checkoutOpen=document.querySelector('.checkout-open');

  const persist=()=>{try{localStorage.setItem(cartKey,JSON.stringify(cart));}catch(e){}};
  const total=()=>Object.values(cart).reduce((sum,item)=>sum+item.qty,0);
  const summary=()=>Object.values(cart).map(item=>item.name+' — '+item.qty+' '+item.unit).join('\n')||'Panier vide';

  function renderCart(){
    const items=Object.values(cart);
    cartCount.forEach(el=>el.textContent=total());
    if(cartEmpty) cartEmpty.hidden=items.length>0;
    if(checkoutOpen) checkoutOpen.disabled=items.length===0;
    if(cartItems){
      cartItems.innerHTML=items.map(item=>'<div class="cart-row" data-cart-id="'+item.id+'"><div><strong>'+item.name+'</strong><small>Quantité en '+item.unit+'</small><button type="button" class="cart-remove" data-remove="'+item.id+'">Retirer</button></div><div class="cart-qty"><button type="button" data-minus="'+item.id+'">−</button><b>'+item.qty+'</b><button type="button" data-plus="'+item.id+'">+</button></div></div>').join('');
    }
    if(checkoutSummary) checkoutSummary.textContent=summary();
    if(checkoutHidden) checkoutHidden.value=summary();
  }

  function openCart(){cartRoot?.classList.add('is-open');cartRoot?.setAttribute('aria-hidden','false');document.body.classList.add('shop-lock');}
  function closeCart(){cartRoot?.classList.remove('is-open');cartRoot?.setAttribute('aria-hidden','true');if(!checkoutModal?.classList.contains('is-open'))document.body.classList.remove('shop-lock');}
  function openCheckout(){if(!Object.keys(cart).length||!checkoutModal)return;closeCart();renderCart();checkoutModal.classList.add('is-open');checkoutModal.setAttribute('aria-hidden','false');document.body.classList.add('shop-lock');}
  function closeCheckout(){checkoutModal?.classList.remove('is-open');checkoutModal?.setAttribute('aria-hidden','true');document.body.classList.remove('shop-lock');}

  document.querySelectorAll('.add-cart').forEach(button=>button.addEventListener('click',()=>{
    const card=button.closest('.shop-card'); if(!card)return;
    const id=card.dataset.id; if(!id)return;
    const item=cart[id]||{id,name:card.dataset.name||id,unit:card.dataset.unit||'unité',qty:0};
    item.qty+=1; cart[id]=item; persist(); renderCart();
    button.textContent='Ajouté ✓'; setTimeout(()=>button.textContent='Ajouter au panier',850);
  }));
  document.querySelectorAll('.cart-open').forEach(b=>b.addEventListener('click',openCart));
  document.querySelectorAll('[data-cart-close]').forEach(b=>b.addEventListener('click',closeCart));
  document.querySelectorAll('[data-checkout-close]').forEach(b=>b.addEventListener('click',closeCheckout));
  checkoutOpen?.addEventListener('click',openCheckout);
  cartItems?.addEventListener('click',event=>{
    const plus=event.target.closest('[data-plus]'),minus=event.target.closest('[data-minus]'),remove=event.target.closest('[data-remove]');
    const id=plus?.dataset.plus||minus?.dataset.minus||remove?.dataset.remove;
    if(!id||!cart[id])return;
    if(plus)cart[id].qty+=1;
    if(minus)cart[id].qty-=1;
    if(remove||cart[id].qty<=0)delete cart[id];
    persist();renderCart();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeCart();closeCheckout();}});
  renderCart();

  /* Original 8-bit shop ambience; no copyrighted game melody. */
  const musicButton=document.querySelector('.shop-music');
  let audioCtx=null,musicTimer=null,musicStep=0;
  const notes=[261.63,329.63,392,523.25,392,329.63,293.66,349.23,440,587.33,440,349.23];
  function note(){
    if(!audioCtx||audioCtx.state!=='running')return;
    const now=audioCtx.currentTime,osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
    osc.type=musicStep%4===0?'square':'triangle'; osc.frequency.value=notes[musicStep%notes.length];
    gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.032,now+.015);gain.gain.exponentialRampToValueAtTime(.0001,now+.22);
    osc.connect(gain).connect(audioCtx.destination);osc.start(now);osc.stop(now+.24);musicStep++;
  }
  function startMusic(){
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    if(!audioCtx)audioCtx=new AC();audioCtx.resume();if(musicTimer)return;
    note();musicTimer=setInterval(note,260);musicButton?.setAttribute('aria-pressed','true');
  }
  function stopMusic(){if(musicTimer)clearInterval(musicTimer);musicTimer=null;musicButton?.setAttribute('aria-pressed','false');}
  musicButton?.addEventListener('click',()=>musicTimer?stopMusic():startMusic());
})();