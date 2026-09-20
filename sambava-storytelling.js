document.addEventListener('DOMContentLoaded',()=>{
 const items=document.querySelectorAll('.vanilla-step');
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})
 },{threshold:.2});
 items.forEach(i=>observer.observe(i));
});
