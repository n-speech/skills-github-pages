// Добавляем логику для бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('#nav a');

// Защита от отсутствия элементов в DOM
if (!burger || !nav) {
  console.warn('Burger menu: elements #burger or #nav not found');
} else {

  // Обработка клика по бургеру — открытие/закрытие меню
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('show');
    burger.innerHTML = nav.classList.contains('show') ? '&times;' : '&#9776;';
  });

  // Обработка клика по ссылкам меню — закрытие меню
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      burger.innerHTML = '&#9776;';
    });
  });

  // Закрытие меню при клике вне бургера и меню
  document.addEventListener('click', (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnBurger = burger.contains(e.target);
    if (!isClickInsideNav && !isClickOnBurger) {
      nav.classList.remove('show');
      burger.innerHTML = '&#9776;';
    }
  });
}

// === Scroll reveal ===
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
