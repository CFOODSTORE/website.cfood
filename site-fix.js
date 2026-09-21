(() => {
  'use strict';

  const legacyTitles = [
    'Madagascar Vanilla',
    'Supplier & Wholesale',
    'Quality & Documents',
    'Supplier Verification',
    'About Challenge Food',
    'Buyer Resource Center'
  ];

  function removeLegacyResources(){
    const all=[...document.querySelectorAll('body *')];
    const titleNodes=all.filter(el=>{
      const t=(el.textContent||'').trim();
      return legacyTitles.includes(t) ||
        t.includes('Guides for pricing, import, export and supplier qualification');
    });

    titleNodes.forEach(el=>{
      if(el.closest('#resources')) return;
      const card=el.closest('article,aside,[class*="card"],[class*="tile"],[class*="resource"],[class*="option"]');
      if(card && !card.closest('#resources')) card.remove();
    });

    // Remove any old resource hub that still contains several of the former cards.
    [...document.querySelectorAll('section,aside,div')].forEach(el=>{
      if(el.closest('#resources')) return;
      const text=(el.textContent||'');
      const hits=legacyTitles.filter(t=>text.includes(t)).length;
      if(hits>=4){
        const r=el.getBoundingClientRect();
        if(r.width>500 && r.height>180 && r.height<1400) el.remove();
      }
    });
  }

  const imageMap = [
    ['.rse-photo-curing','/assets/rse-community-1.webp?v=20260921-1745','Préparation de vanille à Sambava'],
    ['.rse-card:nth-of-type(1) .rse-photo','/assets/rse-community-2.webp?v=20260921-1745','Communauté locale dans la zone d’approvisionnement'],
    ['.rse-card:nth-of-type(2) .rse-photo','/assets/community.webp','École et communauté locale'],
    ['.rse-card:nth-of-type(3) .rse-photo','/assets/rse-community-2.webp?v=20260921-1745','Enfants de la zone d’approvisionnement'],
    ['.rse-card:nth-of-type(4) .rse-photo','/assets/green-vine.webp','Jeune plantation et agroforesterie'],
    ['.rse-card:nth-of-type(5) .rse-photo','/assets/green-hand.webp','Suivi de reboisement et parcelle de vanille']
  ];

  function ensureRseImages(){
    imageMap.forEach(([selector,src,alt])=>{
      const box=document.querySelector(selector);
      if(!box) return;
      box.style.backgroundImage='none';
      let img=box.querySelector('img');
      if(!img){
        img=document.createElement('img');
        box.prepend(img);
      }
      if(!img.dataset.cfoodFixed){
        img.dataset.cfoodFixed='1';
        img.src=src;
        img.alt=alt;
        img.loading=selector==='.rse-photo-curing'?'eager':'lazy';
        img.style.display='block';
        img.style.width='100%';
        img.style.height='100%';
        img.style.objectFit='cover';
        img.style.opacity='1';
        img.onerror=()=>{
          img.onerror=null;
          img.src=selector==='.rse-photo-curing'?'/assets/hero-beans.webp':'/assets/community.webp';
        };
      }
    });
  }

  function fix(){
    removeLegacyResources();
    ensureRseImages();
    window.CFoodTranslate?.();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',fix,{once:true});
  } else {
    fix();
  }
  window.addEventListener('pageshow',fix);
  window.addEventListener('load',fix,{once:true});

  const obs=new MutationObserver(()=>queueMicrotask(fix));
  obs.observe(document.documentElement,{childList:true,subtree:true});

  let count=0;
  const timer=setInterval(()=>{
    fix();
    if(++count>24) clearInterval(timer);
  },250);
})();