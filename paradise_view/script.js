const menuToggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.primary-nav');menuToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false')}));
const searchForm=document.getElementById('experience-search');const searchInput=document.getElementById('site-search');const category=document.getElementById('experience-type');const cards=[...document.querySelectorAll('.experience-card')];const noResults=document.getElementById('no-results');function filterExperiences(){const q=(searchInput?.value||'').trim().toLowerCase();const type=category?.value||'all';let shown=0;cards.forEach(card=>{const matchesText=!q||card.textContent.toLowerCase().includes(q);const matchesType=type==='all'||card.dataset.category===type;card.hidden=!(matchesText&&matchesType);if(!card.hidden)shown++});if(noResults)noResults.hidden=shown>0;document.getElementById('experiences')?.scrollIntoView({behavior:'smooth',block:'start'})}searchForm?.addEventListener('submit',e=>{e.preventDefault();filterExperiences()});category?.addEventListener('change',filterExperiences);
const overlay=document.getElementById('search-overlay');const overlayInput=document.getElementById('overlay-input');document.querySelector('.search-open')?.addEventListener('click',()=>{overlay.hidden=false;overlayInput?.focus()});document.getElementById('overlay-close')?.addEventListener('click',()=>{overlay.hidden=true});overlay?.addEventListener('click',e=>{if(e.target===overlay)overlay.hidden=true});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay&&!overlay.hidden)overlay.hidden=true});document.getElementById('overlay-search')?.addEventListener('submit',e=>{e.preventDefault();searchInput.value=overlayInput.value;category.value='all';overlay.hidden=true;filterExperiences()});

// Accessible, auto-rotating hero slideshow with manual controls.
const heroImage=document.querySelector('.hero-image');
const heroDots=[...document.querySelectorAll('.hero-dot')];
const heroCurrent=document.getElementById('hero-slide-current');
const heroPrev=document.querySelector('.hero-prev');
const heroNext=document.querySelector('.hero-next');
const heroSlides=[
  {image:'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2200&q=90',position:'center 46%',label:'Traditional Chinese architecture and garden scenery'},
  {image:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=90',position:'center 52%',label:'Peaceful lake and green landscape'},
  {image:'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2200&q=90',position:'center 48%',label:'Historic architecture framed by trees'},
  {image:'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2200&q=90',position:'center 50%',label:'A quiet path through lush greenery'}
];
let heroIndex=0;
let heroTimer=null;
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function showHeroSlide(nextIndex){
  if(!heroImage)return;
  heroIndex=(nextIndex+heroSlides.length)%heroSlides.length;
  const slide=heroSlides[heroIndex];
  heroImage.classList.add('is-changing');
  window.setTimeout(()=>{
    heroImage.style.backgroundImage=`url("${slide.image}")`;
    heroImage.style.backgroundPosition=slide.position;
    heroImage.setAttribute('aria-label',slide.label);
    heroImage.classList.remove('is-changing');
  },reduceMotion?0:180);
  heroDots.forEach((dot,index)=>{
    const active=index===heroIndex;
    dot.classList.toggle('is-active',active);
    dot.setAttribute('aria-pressed',String(active));
  });
  if(heroCurrent)heroCurrent.textContent=String(heroIndex+1).padStart(2,'0');
}
function stopHeroTimer(){if(heroTimer){window.clearInterval(heroTimer);heroTimer=null;}}
function startHeroTimer(){stopHeroTimer();if(!reduceMotion)heroTimer=window.setInterval(()=>showHeroSlide(heroIndex+1),6500);}
heroPrev?.addEventListener('click',()=>{showHeroSlide(heroIndex-1);startHeroTimer();});
heroNext?.addEventListener('click',()=>{showHeroSlide(heroIndex+1);startHeroTimer();});
heroDots.forEach((dot,index)=>dot.addEventListener('click',()=>{showHeroSlide(index);startHeroTimer();}));
const heroSection=document.querySelector('.hero');
heroSection?.addEventListener('mouseenter',stopHeroTimer);
heroSection?.addEventListener('mouseleave',startHeroTimer);
heroSection?.addEventListener('focusin',stopHeroTimer);
heroSection?.addEventListener('focusout',startHeroTimer);
if(heroSection)startHeroTimer();

document.getElementById('year').textContent=new Date().getFullYear();document.getElementById('contact-form')?.addEventListener('submit',e=>{e.preventDefault();const status=document.getElementById('form-status');status.textContent='Your form is validated in this preview, but no message has been sent. Connect a secure form service to receive enquiries.'});
