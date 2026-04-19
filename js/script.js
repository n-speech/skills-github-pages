// ===== БУРГЕР-МЕНЮ =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('#nav a');

if (!burger || !nav) {
  console.warn('Burger menu: elements #burger or #nav not found');
} else {
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('show');
    burger.innerHTML = nav.classList.contains('show') ? '&times;' : '&#9776;';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      burger.innerHTML = '&#9776;';
    });
  });

  document.addEventListener('click', (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnBurger = burger.contains(e.target);
    if (!isClickInsideNav && !isClickOnBurger) {
      nav.classList.remove('show');
      burger.innerHTML = '&#9776;';
    }
  });
}

// ===== STICKY HEADER =====
(function () {
  const header = document.querySelector('.header-container');
  if (!header) return;

  const headerHeight = header.offsetHeight;
  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    if (currentY > headerHeight) {
      // Хедер ушёл за верх — прилипаем
      header.classList.add('sticky');

      if (currentY > lastY) {
        // Скролл вниз — прячем
        header.classList.add('hidden');
      } else {
        // Скролл вверх — показываем
        header.classList.remove('hidden');
      }
    } else {
      // Ещё видим хедер в потоке — снимаем sticky
      header.classList.remove('sticky');
      header.classList.remove('hidden');
    }

    lastY = currentY;
  }, { passive: true });
})();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // анимируется только один раз
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});
