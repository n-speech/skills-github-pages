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
    { selector: '.about-inner.right .about-text', cls: 'reveal from-right' },
    { selector: '.about-inner.right .about-image', cls: 'reveal from-left' },
    { selector: '.about-inner.left .about-text',  cls: 'reveal from-left' },
    { selector: '.about-inner.left .about-image', cls: 'reveal from-right' },
  ];
  revealSelectors.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.classList.contains('reveal')) {
        cls.split(' ').forEach(c => el.classList.add(c));
      }
    });
  });
  // Добавляем reveal к h1, но без отдельного observer
  document.querySelectorAll('h1').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Если это первая карточка — активируем ближайший h1 выше неё
        if (entry.target.classList.contains('course-card')) {
          const allCards = [...document.querySelectorAll('.course-card')];
          if (allCards.indexOf(entry.target) === 0) {
            // Ищем h1, который стоит перед секцией с карточками
            const section = entry.target.closest('section') || entry.target.parentElement;
            const heading = section?.querySelector('h1') ?? document.querySelector('h1');
            if (heading) heading.classList.add('visible');
          }
        }
        observer.unobserve(entry.target);

});
