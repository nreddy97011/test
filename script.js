window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 900);
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.hero-dot'));
let current = 0;
let autoplayTimer;

function showSlide(index) {
  slides[current].classList.remove('active');
  dots[current]?.classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current]?.classList.add('active');
}

function startAutoplay() {
  if (prefersReducedMotion || slides.length < 2) return;
  autoplayTimer = setInterval(() => showSlide(current + 1), 4500);
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    stopAutoplay();
    showSlide(index);
    startAutoplay();
  });
});

const hero = document.querySelector('.hero');
hero.addEventListener('mouseenter', stopAutoplay);
hero.addEventListener('mouseleave', startAutoplay);
startAutoplay();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 450);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
