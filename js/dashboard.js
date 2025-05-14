document.addEventListener('DOMContentLoaded', () => {
  const userData = JSON.parse(localStorage.getItem('currentUser'));

  if (!userData) {
    alert('Пожалуйста, войдите сначала.');
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('student-name').textContent = userData.name;
  document.getElementById('student-course').textContent = userData.course;

  const user = users[userData.name];

  // Теперь передаём массив открытых уроков
  renderLessons(userData.name, user.course, user.openLessons, user.grades);
});

function getCourseFolder(course) {
  switch (course) {
    case 'Английский для начинающих': return 'english-beginner';
    case 'Английский для продолжающих': return 'english-intermediate';
    case 'Английский для детей': return 'english-kids';
    case 'Французский для начинающих': return 'french';
    default: return 'unknown';
  }
}

function renderLessons(name, course, openLessonsArray, grades) {
  const grid = document.getElementById('lesson-grid');
  grid.innerHTML = '';

  const folder = getCourseFolder(course);

  const percent = Math.floor(((openLessonsArray.length - 1) / 10) * 100);
  document.getElementById('progress-bar').style.width = `${percent}%`;
  document.getElementById('progress-text').textContent = percent;

  for (let i = 1; i <= 10; i++) {
    const card = document.createElement('div');
    card.className = 'lesson-card';

    const title = document.createElement('h3');
    title.textContent = `Урок ${i}`;
    card.appendChild(title);

    const status = document.createElement('div');
    status.className = 'status';

    if (openLessonsArray.includes(i)) {
      const link = document.createElement('a');
      link.href = `courses/${folder}/lesson${i}.html`;
      link.textContent = 'Перейти к уроку';
      link.style.color = '#275492';
      status.appendChild(link);
    } else {
      status.textContent = 'Закрыт';
      status.classList.add('locked');
    }

    card.appendChild(status);

    const grade = document.createElement('div');
    grade.className = 'grade';
    grade.textContent = `Оценка: ${grades[i] || '-'}`;
    card.appendChild(grade);

    grid.appendChild(card);
  }
}

document.getElementById('logout-button').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
});
