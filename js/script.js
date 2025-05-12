// Запрос открытых уроков с сервера
async function getUnlockedLessons(studentName) {
    const response = await fetch(`https://твой-домен.onrender.com/access?student=${encodeURIComponent(studentName)}`);
    const data = await response.json();
    return data.unlocked || [];
  }
  
  // Добавляем логику для бургер-меню

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navLinks = nav.querySelectorAll('a');

  // Переключение меню и иконки
  burger.addEventListener('click', () => {
    nav.classList.toggle('show');
    burger.innerHTML = nav.classList.contains('show') ? '&times;' : '&#9776;';
  });

  // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      burger.innerHTML = '&#9776;';
    });
  });
