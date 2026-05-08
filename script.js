const loader = document.getElementById('loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('hide'), 700));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const slides = [...document.querySelectorAll('.hero-slide')];
const dotsWrap = document.getElementById('heroDots');
let index = 0;
let timer;

slides.forEach((_, i) => {
  const btn = document.createElement('button');
  btn.className = i === 0 ? 'active' : '';
  btn.ariaLabel = `Go to slide ${i + 1}`;
  btn.addEventListener('click', () => {
    stop();
    show(i);
    start();
  });
  dotsWrap.appendChild(btn);
});

const dots = [...dotsWrap.querySelectorAll('button')];

function show(i) {
  slides[index].classList.remove('active');
  dots[index].classList.remove('active');
  index = (i + slides.length) % slides.length;
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}
function start() { if (!reducedMotion && slides.length > 1) timer = setInterval(() => show(index + 1), 4300); }
function stop() { clearInterval(timer); }

const hero = document.querySelector('.hero');
hero.addEventListener('mouseenter', stop);
hero.addEventListener('mouseleave', start);
start();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

const btnTop = document.getElementById('toTop');
window.addEventListener('scroll', () => btnTop.classList.toggle('show', window.scrollY > 420));
btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', () => {
  menu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', menu.classList.contains('open'));
});
document.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', () => {
  menu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}));
