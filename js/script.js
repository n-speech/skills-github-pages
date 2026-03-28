  
  // Добавляем логику для бургер-меню

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('#nav a');

// Обработка клика по бургеру — открытие/закрытие меню
burger.addEventListener('click', (e) => {
  e.stopPropagation(); // чтобы клик по бургеру не закрывал меню
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

// === Scroll reveal ===
function initScrollReveal() {
  const revealSelectors = [
    { selector: '.page1',       cls: 'reveal' },
    { selector: '.course-card', cls: 'reveal' },
    { selector: '.form-card',   cls: 'reveal' },
    { selector: '.about-inner.right .about-text',  cls: 'reveal from-right' },
    { selector: '.about-inner.right .about-image', cls: 'reveal from-left' },
    { selector: '.about-inner.left .about-text',   cls: 'reveal from-left' },
    { selector: '.about-inner.left .about-image',  cls: 'reveal from-right' },
  ];

  revealSelectors.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach(el => {
      cls.split(' ').forEach(c => { if (c) el.classList.add(c); });
    });
  });

  document.querySelectorAll('h1').forEach(el => el.classList.add('reveal'));

  // Для каждого h1 находим первый .reveal-элемент после него — триггер
  const h1Triggers = new Map();

  document.querySelectorAll('h1').forEach(h1 => {
    let sibling = h1.nextElementSibling;
    while (sibling) {
      const target = sibling.classList.contains('reveal')
        ? sibling
        : sibling.querySelector('.reveal');
      if (target) {
        h1Triggers.set(target, h1);
        break;
      }
      sibling = sibling.nextElementSibling;
    }
  });

  const observer = new IntersectionObserver((entries) => {
    let cardDelay = 0;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('course-card')) {
          entry.target.style.transitionDelay = `${cardDelay}s`;
          cardDelay += 0.2;
        }
        entry.target.classList.add('visible');
        if (h1Triggers.has(entry.target)) {
          h1Triggers.get(entry.target).classList.add('visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => {
    if (el.tagName !== 'H1') observer.observe(el);
  });

  // Сразу показываем элементы, которые уже видны при загрузке
  setTimeout(() => {
    let cardDelay = 0;

    document.querySelectorAll('.reveal').forEach(el => {
      if (el.tagName === 'H1') return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (el.classList.contains('course-card')) {
          el.style.transitionDelay = `${cardDelay}s`;
          cardDelay += 0.2;
        }
        el.classList.add('visible');
        if (h1Triggers.has(el)) {
          h1Triggers.get(el).classList.add('visible');
        }
        observer.unobserve(el);
      }
    });
  }, 50);
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

