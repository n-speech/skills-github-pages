

document.addEventListener('DOMContentLoaded', () => {
  const userData = JSON.parse(localStorage.getItem('currentUser'));

  if (!userData) {
    alert('Пожалуйста, войдите сначала.');
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('student-name').textContent = userData.name;
  document.getElementById('student-course').textContent = userData.course;
  document.getElementById('progress').textContent = userData.progress;

  renderLessons(userData.course, userData.progress);
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

// Твои оценки для каждого ученика
const allGrades = {
  'Dana': {
    'lesson1': 'Отлично',
    'lesson2': 'Хорошо',
    'lesson3': 'Нужно доработать'
  },
  'Alex': {
    'lesson1': 'Хорошо',
    'lesson2': 'Отлично'
  }
};

function renderLessons(courseName, progress) {
  const tableBody = document.querySelector('#lesson-list tbody');
  tableBody.innerHTML = '';

  const folder = getCourseFolder(courseName);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const userGrades = allGrades[user.name] || {};

  for (let i = 1; i <= 10; i++) {
    const tr = document.createElement('tr');

    // Урок
    const lessonCell = document.createElement('td');
    if (progress >= (i - 1) * 10) {
      const link = document.createElement('a');
      link.href = `courses/${folder}/lesson${i}.html`;
      link.textContent = `Урок ${i}`;
      lessonCell.appendChild(link);
    } else {
      lessonCell.textContent = `Урок ${i}`;
      lessonCell.classList.add('locked');
    }

    // Статус
    const statusCell = document.createElement('td');
    statusCell.textContent = progress >= (i - 1) * 10 ? 'Открыт' : 'Закрыт';

    // Оценка
    const gradeCell = document.createElement('td');
    gradeCell.textContent = userGrades[`lesson${i}`] || '-';

    // Добавить в таблицу
    tr.appendChild(lessonCell);
    tr.appendChild(statusCell);
    tr.appendChild(gradeCell);
    tableBody.appendChild(tr);
  }
}


document.getElementById('logout-button').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
});
