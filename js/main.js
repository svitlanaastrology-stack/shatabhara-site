(function(){
  var d=document, root=d.documentElement;
  root.classList.add('js');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Local preview (file://): directory links -> index.html
  if(location.protocol==='file:'){
    d.querySelectorAll('.lang-switch a').forEach(function(a){var h=a.getAttribute('href');if(/\/$/.test(h))a.setAttribute('href',h+'index.html');});
  }

  // Twinkling stars
  d.querySelectorAll('.stars').forEach(function(box){
    var n=window.innerWidth<700?45:90, frag=d.createDocumentFragment();
    for(var i=0;i<n;i++){
      var s=d.createElement('span');
      s.className='star'+(Math.random()<.18?' big':'');
      s.style.left=(Math.random()*100)+'%';
      s.style.top=(Math.random()*100)+'%';
      s.style.setProperty('--d',(2.5+Math.random()*4).toFixed(2)+'s');
      s.style.setProperty('--delay',(-Math.random()*6).toFixed(2)+'s');
      frag.appendChild(s);
    }
    box.appendChild(frag);
  });

  // Mobile nav
  var t=d.querySelector('.nav-toggle'), nav=d.getElementById('site-nav');
  if(t&&nav){
    var isUk=root.lang==='uk';
    t.addEventListener('click',function(){
      var open=t.getAttribute('aria-expanded')==='true';
      t.setAttribute('aria-expanded',String(!open));
      t.setAttribute('aria-label',open?(isUk?'Відкрити меню':'Открыть меню'):(isUk?'Закрити меню':'Закрыть меню'));
      nav.classList.toggle('open',!open);
    });
    nav.addEventListener('click',function(e){
      if(e.target.closest('a')&&window.innerWidth<980){nav.classList.remove('open');t.setAttribute('aria-expanded','false');}
    });
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');t.setAttribute('aria-expanded','false');t.focus();}});
  }

  // Reveal on scroll
  var els=d.querySelectorAll('.reveal');
  if(reduce||!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('is-visible')});}
  else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target);}});
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  }

  // FAQ: one open at a time
  var items=d.querySelectorAll('.faq-item');
  items.forEach(function(it){it.addEventListener('toggle',function(){if(it.open){items.forEach(function(o){if(o!==it)o.open=false;});}});});

  var y=d.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();
