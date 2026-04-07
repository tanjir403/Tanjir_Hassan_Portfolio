const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('#mobileMenu a');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const fadeItems = document.querySelectorAll('.fade-up');
const scrollProgress = document.getElementById('scrollProgress');

function toggleMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('hidden');
}

function closeMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('hidden');
}

function revealOnScroll() {
  fadeItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 60) {
      item.classList.add('show');
    }
  });
}

function updateActiveNav() {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id') || '';
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

if (menuBtn) {
  menuBtn.addEventListener('click', toggleMenu);
}

mobileLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('scroll', () => {
  revealOnScroll();
  updateActiveNav();
  updateScrollProgress();
}, { passive: true });

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
  updateScrollProgress();
});

revealOnScroll();
updateActiveNav();
updateScrollProgress();