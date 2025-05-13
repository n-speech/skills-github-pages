

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
    case 'Французский': return 'french';
    default: return 'unknown';
  }
}

function renderLessons(courseName, progress) {
  const list = document.getElementById('lesson-list');
  list.innerHTML = '';

  const folder = getCourseFolder(courseName);

  for (let i = 1; i <= 10; i++) {
    const li = document.createElement('li');

    if (progress >= (i - 1) * 10) {
      const link = document.createElement('a');
      link.href = `courses/${folder}/lesson${i}.html`;
      link.textContent = `Урок ${i}`;
      li.appendChild(link);
    } else {
      li.textContent = `Урок ${i} (закрыт)`;
      li.classList.add('locked');
    }

    list.appendChild(li);
  }
}

document.getElementById('logout-button').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
});
