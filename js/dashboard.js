const student = JSON.parse(localStorage.getItem('student'));

if (!student) {
  window.location.href = 'login.html';
}

document.getElementById('student-name').textContent = student.name;

// Показываем только карточку его курса
const courseCard = document.getElementById(`${student.course}-card`);
if (courseCard) {
  courseCard.style.display = 'block';
}
