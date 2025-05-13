const users = {
  'Dana': { password: '1234', course: 'Французский для начинающих', progress: 10 },
  'Alex': { password: 'abcd', course: 'Английский для детей', progress: 20 },
  'Timur': { password: 'abcd', course: 'Английский для продолжающих', progress: 0 },
  'Boris': { password: 'Boris123', course: 'Французский для начинающих', progress: 30 }
};

function login() {
  const name = document.getElementById('name-input').value.trim();
  const password = document.getElementById('password-input').value;

  if (users[name] && users[name].password === password) {
    localStorage.setItem('currentUser', JSON.stringify({
      name: name,
      course: users[name].course,
      progress: users[name].progress
    }));

    window.location.href = 'dashboard.html';
  } else {
    alert('Неверное имя или пароль');
  }
}
