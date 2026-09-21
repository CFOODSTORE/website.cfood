(() => {
  'use strict';

  const ids=['home','company','vanilla-journey','rse','resources','boutique','quality','compliance','requests'];
  const aliases={products:'boutique',special:'boutique',top:'home','industrial-buy':'boutique'};
  const pages=ids.map(id=>document.getElementById(id)).filter(Boolean);
  const nav=document.querySelector('.main-nav');
  const header=document.querySelector('.site-header');
  let current=0;
  let timer=null;

  if(!pages.length) return;

  function syncHeader(){
    const h=Math.max(64,Math.round(header?.getBoundingClientRect().height||88));
    document.documentElement.style.setProperty('--cf-header-h',h+'px');
  }

  function clearState(page){
    page.classList.remove('page-active','page-door-prep','page-door-prep-back','page-door-in','page-door-out','page-door-out-back');
  }

  function setActive(index){
    clearTimeout(timer);
    pages.forEach((p,i)=>{
      clearState(p);
      const on=i===index;
      p.classList.toggle('page-active',on);
      p.hidden=!on;
      p.setAttribute('aria-hidden',on?'false':'true');
      p.style.pointerEvents=on?'auto':'none';
      if(on) p.scrollTop=0;
    });
    current=index;
    updateUi();
  }

  function updateUi(){
    const id=pages[current]?.id||'home';
    nav?.querySelectorAll('a[href^="#"]').forEach(a=>{
      const raw=a.getAttribute('href').slice(1);
      a.classList.toggle('page-nav-active',(aliases[raw]||raw)===id);
    });
    const prev=document.querySelector('[data-page-prev]');
    const next=document.querySelector('[data-page-next]');
    if(prev) prev.disabled=current===0;
    if(next) next.disabled=current===pages.length-1;
    window.CFoodTranslate?.();
  }

  function go(index,hash){
    if(index<0||index>=pages.length) return;
    if(index===current){
      pages[current].scrollTo({top:0,behavior:'smooth'});
      if(hash) history.replaceState(null,'',hash);
      return;
    }

    clearTimeout(timer);
    const old=pages[current];
    const incoming=pages[index];
    const forward=index>current;

    pages.forEach(p=>{
      if(p!==old && p!==incoming){
        clearState(p);
        p.hidden=true;
        p.setAttribute('aria-hidden','true');
        p.style.pointerEvents='none';
      }
    });

    old.hidden=false;
    incoming.hidden=false;
    old.setAttribute('aria-hidden','true');
    incoming.setAttribute('aria-hidden','false');
    old.style.pointerEvents='none';
    incoming.style.pointerEvents='none';

    clearState(old);
    clearState(incoming);
    old.classList.add(forward?'page-door-out':'page-door-out-back');
    incoming.classList.add(forward?'page-door-prep':'page-door-prep-back');
    void incoming.offsetWidth;
    requestAnimationFrame(()=>{
      incoming.classList.remove('page-door-prep','page-door-prep-back');
      incoming.classList.add('page-door-in');
    });

    current=index;
    if(hash) history.pushState(null,'',hash);
    updateUi();

    timer=setTimeout(()=>{
      pages.forEach((p,i)=>{
        clearState(p);
        const on=i===current;
        p.classList.toggle('page-active',on);
        p.hidden=!on;
        p.setAttribute('aria-hidden',on?'false':'true');
        p.style.pointerEvents=on?'auto':'none';
      });
      updateUi();
    },760);
  }

  function route(hash,instant=false){
    const raw=(hash||'#home').replace(/^#/,'')||'home';
    const mapped=aliases[raw]||raw;
    const targetPage=document.getElementById(mapped);
    const index=pages.indexOf(targetPage);
    if(index<0) return;
    if(instant) setActive(index);
    else go(index,'#'+raw);
    if(raw==='industrial-buy'){
      setTimeout(()=>document.getElementById('industrial-buy')?.scrollIntoView({behavior:'smooth',block:'start'}),820);
    }
  }

  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href^="#"]');
    if(!a) return;
    const href=a.getAttribute('href');
    if(!href||href==='#') return;
    const raw=href.slice(1);
    const mapped=aliases[raw]||raw;
    const target=document.getElementById(mapped);
    const index=pages.indexOf(target);
    if(index<0) return;
    event.preventDefault();
    go(index,href);
    nav?.classList.remove('open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
    if(raw==='industrial-buy'){
      setTimeout(()=>document.getElementById('industrial-buy')?.scrollIntoView({behavior:'smooth',block:'start'}),820);
    }
  });

  window.addEventListener('popstate',()=>route(location.hash,true));

  let switcher=document.querySelector('.page-switcher');
  if(!switcher){
    switcher=document.createElement('div');
    switcher.className='page-switcher';
    switcher.innerHTML='<button type="button" data-page-prev aria-label="Page précédente">←</button><button type="button" data-page-next aria-label="Page suivante">→</button>';
    document.body.appendChild(switcher);
  }
  let label=document.querySelector('.page-name');
  if(!label){
    label=document.createElement('div');
    label.className='page-name';
    document.body.appendChild(label);
  }
  switcher.querySelector('[data-page-prev]')?.addEventListener('click',()=>go(current-1,'#'+pages[current-1]?.id));
  switcher.querySelector('[data-page-next]')?.addEventListener('click',()=>go(current+1,'#'+pages[current+1]?.id));

  syncHeader();
  window.addEventListener('resize',syncHeader,{passive:true});
  document.body.classList.add('cf-pages-ready');
  route(location.hash||'#home',true);
})();