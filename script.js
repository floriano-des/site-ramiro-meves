const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('[data-menu-toggle]');
const header = document.querySelector('[data-header]');

function closeMenu() {
  if (!menu || !menuToggle) return;
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('menu-open');
}

function toggleMenu() {
  if (!menu || !menuToggle) return;
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', isOpen);
}

menuToggle?.addEventListener('click', toggleMenu);

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 920) closeMenu();
});

if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = String(new Date().getFullYear());
});
