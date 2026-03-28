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

/* =========================================
   Native Speech — Scroll Animations
   Подключить в конце <body>:
   <script src="js/scroll-animations.js"></script>
   ========================================= */

/* --- 1. Добавляем CSS прямо из JS --- */
const style = document.createElement('style');
style.textContent = `
  /* Базовое состояние — элемент невидим до анимации */
  .ns-fade-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .ns-fade-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .ns-fade-right {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .ns-scale-in {
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Состояние после появления */
  .ns-visible {
    opacity: 1;
    transform: none;
  }

  /* Задержки для stagger-эффекта */
  .ns-delay-1 { transition-delay: 0.1s; }
  .ns-delay-2 { transition-delay: 0.2s; }
  .ns-delay-3 { transition-delay: 0.3s; }

  /* Подчёркивание заголовков h1 с анимацией */
  h1 {
    position: relative;
    display: inline-block;
  }
  h1::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 3px;
    background: currentColor;
    border-radius: 2px;
    transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
    opacity: 0.25;
  }
  h1.ns-visible::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

/* --- 2. Навешиваем классы на нужные элементы --- */
function assignClasses() {
  /* Карточки курсов — вылетают снизу с задержкой */
  document.querySelectorAll('.course-card').forEach((card, i) => {
    card.classList.add('ns-fade-up', `ns-delay-${i + 1}`);
  });

  /* Блоки "О методике" — чередуем направление */
  document.querySelectorAll('.about-inner.right .about-text').forEach(el => {
    el.classList.add('ns-fade-right');
  });
  document.querySelectorAll('.about-inner.right .about-image').forEach(el => {
    el.classList.add('ns-fade-left');
  });
  document.querySelectorAll('.about-inner.left .about-text').forEach(el => {
    el.classList.add('ns-fade-left');
  });
  document.querySelectorAll('.about-inner.left .about-image').forEach(el => {
    el.classList.add('ns-fade-right');
  });

  /* Форма записи — масштабируется при появлении */
  document.querySelectorAll('.form-card').forEach(el => {
    el.classList.add('ns-scale-in');
  });

  /* Параграфы .page1 — плавно снизу */
  document.querySelectorAll('p.page1').forEach(el => {
    el.classList.add('ns-fade-up');
  });

  /* Заголовки h1 — fade up + подчёркивание */
  document.querySelectorAll('h1').forEach(el => {
    el.classList.add('ns-fade-up');
  });
}

/* --- 3. IntersectionObserver — включаем анимацию при попадании в viewport --- */
function initObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ns-visible');
          observer.unobserve(entry.target); /* однократно */
        }
      });
    },
    {
      threshold: 0.12,   /* элемент на 12% в зоне видимости */
      rootMargin: '0px 0px -40px 0px'
    }
  );

  const animated = document.querySelectorAll(
    '.ns-fade-up, .ns-fade-left, .ns-fade-right, .ns-scale-in'
  );
  animated.forEach(el => observer.observe(el));
}

/* --- 4. Плавный parallax для hero-изображений --- */
function initParallax() {
  const desktopImg = document.querySelector('.desktop-image');
  const mobileImg  = document.querySelector('.mobile-image');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (desktopImg) desktopImg.style.transform = `translateY(${y * 0.18}px)`;
    if (mobileImg)  mobileImg.style.transform  = `translateY(${y * 0.18}px)`;
  }, { passive: true });
}

/* --- Запуск после загрузки DOM --- */
document.addEventListener('DOMContentLoaded', () => {
  initParallax();

  setTimeout(() => {
    assignClasses();
    initObserver();
  }, 1800);
});
