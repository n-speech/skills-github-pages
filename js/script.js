// Запрос открытых уроков с сервера
async function getUnlockedLessons(studentName) {
    const response = await fetch(`https://твой-домен.onrender.com/access?student=${encodeURIComponent(studentName)}`);
    const data = await response.json();
    return data.unlocked || [];
  }
  
  // Добавляем логику для бургер-меню
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });