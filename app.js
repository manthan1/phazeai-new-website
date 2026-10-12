'use strict';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 700px)');
const workflow = document.querySelector('.workflow');
// Native flow on phones avoids paying a scroll tax for a stacked diagram.
if (mobile.matches || reducedMotion.matches) workflow.dataset.scAct = 'flow';
if (window.ScrollCraft) window.ScrollCraft.mount(document.querySelector('[data-sc-root]'));

const scenarios = {
  outreach: {name:'Sales & outreach',input:'A prospect list',process:'Research & context',output:'Relevant outreach',description:'Connect research, data collection and personalized email generation. Give your team a stronger starting point for every conversation.'},
  documents: {name:'Documents & data',input:'Engineering drawings',process:'Specification extraction',output:'A prepared quotation',description:'Turn engineering drawings into structured specifications and generated quotations. Scope the checks and review steps around your team.'},
  support: {name:'Customer conversations',input:'An incoming enquiry',process:'A conversational assistant',output:'A useful next step',description:'Help people get answers, schedule appointments and share feedback through conversational assistants built for the task.'}
};
for (const button of document.querySelectorAll('[data-scenario]')) {
  button.addEventListener('click', () => {
    const scenario = scenarios[button.dataset.scenario];
    for (const other of document.querySelectorAll('[data-scenario]')) other.setAttribute('aria-pressed',String(other === button));
    document.querySelector('#node-input').textContent = scenario.input;
    document.querySelector('#node-process').textContent = scenario.process;
    document.querySelector('#node-output').textContent = scenario.output;
    document.querySelector('#scenario-description').textContent = scenario.description;
    document.querySelector('#inquiry-topic').textContent = scenario.name;
    const subject = 'Let’s explore a ' + scenario.name.toLowerCase() + ' workflow';
    const body = 'Hi PhazeAI,\n\nI’m interested in ' + scenario.name.toLowerCase() + '.\n\nThe repetitive task I’d like help with:\n\nThe tools our team uses:\n\n';
    document.querySelector('#inquiry-email').href = 'mailto:contactus@phazeai.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}

const menu = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { mobileNav.hidden = true; menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open navigation'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; mobileNav.hidden = !open; menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation'); });
for (const link of mobileNav.querySelectorAll('a')) link.addEventListener('click',closeMenu);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menu.focus(); } });
function updateMode() { closeMenu(); workflow.dataset.scAct = mobile.matches || reducedMotion.matches ? 'flow' : 'pin'; }
mobile.addEventListener('change',updateMode);
reducedMotion.addEventListener('change',updateMode);
document.querySelector('#year').textContent = String(new Date().getFullYear());

const art = document.querySelector('.hero-art');
const hero = document.querySelector('.hero');
const loom = document.querySelector('.loom');
let scheduled = false;
function paint() {
  scheduled = false;
  const heroBox = hero.getBoundingClientRect();
  if (heroBox.bottom > 0 && !reducedMotion.matches) art.style.setProperty('--sy',Math.min(90,Math.max(0,-heroBox.top)*.18)+'px');
  const box = workflow.getBoundingClientRect();
  const progress = mobile.matches || reducedMotion.matches ? 1 : Math.max(0,Math.min(1,(-box.top + innerHeight*.12) / Math.max(1,box.height-innerHeight)));
  loom.style.setProperty('--route',String(progress));
  loom.dataset.scVerifyState = 'route:' + Math.round(progress*100);
}
function schedulePaint() { if (!scheduled) { scheduled = true; requestAnimationFrame(paint); } }
addEventListener('scroll',schedulePaint,{passive:true});
addEventListener('resize',schedulePaint,{passive:true});
reducedMotion.addEventListener('change',schedulePaint);
hero.addEventListener('pointermove', event => {
  if (reducedMotion.matches || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const box = hero.getBoundingClientRect();
  art.style.setProperty('--px',((event.clientX-box.left)/box.width-.5)*18+'px');
  art.style.setProperty('--py',((event.clientY-box.top)/box.height-.5)*12+'px');
});
hero.addEventListener('pointerleave',()=>{art.style.setProperty('--px','0px');art.style.setProperty('--py','0px');});
paint();

const motionToggle = document.querySelector('.motion-toggle');
let motionPreference = null;
try { motionPreference = localStorage.getItem('phaze-hero-motion'); } catch { /* Storage is optional. */ }
function setHeroMotion(paused) {
  hero.classList.toggle('motion-paused', paused);
  hero.classList.toggle('motion-enabled', !paused);
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.innerHTML = paused ? 'Play animation <span aria-hidden="true">▷</span>' : 'Pause animation <span aria-hidden="true">Ⅱ</span>';
}
setHeroMotion(motionPreference === 'pause' || (motionPreference !== 'play' && reducedMotion.matches));
motionToggle.addEventListener('click', () => {
  const paused = !hero.classList.contains('motion-paused');
  setHeroMotion(paused);
  motionPreference = paused ? 'pause' : 'play';
  try { localStorage.setItem('phaze-hero-motion', motionPreference); } catch { /* Motion works without persistence. */ }
});
reducedMotion.addEventListener('change', () => { if (!motionPreference) setHeroMotion(reducedMotion.matches); });
let heroVisible = true;
function updateAnimationVisibility() { hero.classList.toggle('motion-offscreen', !heroVisible || document.hidden); }
new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; updateAnimationVisibility(); }).observe(hero);
document.addEventListener('visibilitychange', updateAnimationVisibility);
