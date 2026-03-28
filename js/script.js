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
function initScrollReveal() {
  const revealSelectors = [
    { selector: 'h1',           cls: 'reveal' },
    { selector: '.page1',       cls: 'reveal' },
    { selector: '.course-card', cls: 'reveal' },
    { selector: '.form-card',   cls: 'reveal' },
    { selector: '.about-inner.right .about-text',  cls: 'reveal from-right' },
    { selector: '.about-inner.right .about-image', cls: 'reveal from-left' },
    { selector: '.about-inner.left .about-text',   cls: 'reveal from-left' },
    { selector: '.about-inner.left .about-image',  cls: 'reveal from-right' },
  ];

  // Добавляем классы нужным элементам (исправлено: каждый класс добавляется независимо)
  revealSelectors.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach(el => {
      cls.split(' ').forEach(c => {
        if (c) el.classList.add(c);
      });
    });
  });

  // IntersectionObserver — запускает анимацию при появлении в зоне видимости
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        requestAnimationFrame(() => observer.unobserve(entry.target));
      }
    });
  }, {
    threshold: 0.15
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Исправлено: корректная инициализация вне зависимости от момента загрузки скрипта
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
