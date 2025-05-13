const users = {
  'Dana': { password: '1234', course: 'Французский', progress: 10 },
  'Alex': { password: '5678', course: 'Английский', progress: 20 },
  'Timur': { password: '4321', course: 'Английский для детей', progress: 0 },
  'Boris': { password: '8765', course: 'Английский для продолжающих', progress: 30 }
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
