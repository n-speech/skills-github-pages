document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  if (users[username] && users[username].password === password) {
    const user = users[username];

    localStorage.setItem('currentUser', JSON.stringify({
      name: username,
      course: user.course,
      progress: user.progress,
      grades: user.grades
    }));

    window.location.href = 'dashboard.html';
  } else {
    errorMessage.textContent = 'Неверное имя или пароль. Попробуйте снова.';
  }
});
