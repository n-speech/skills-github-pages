document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Проверка данных (в реальной жизни — это должен быть запрос к серверу)
    const users = {
        "Dana": { password: "1234", course: "french" },
        "Alex": { password: "abcd", course: "english" },
        "Maria": { password: "12345", course: "englishbegin"}
    };

    // Проверка правильности пароля
    if (users[username] && users[username].password === password) {
        // Сохраняем информацию о пользователе в localStorage
        const student = {
            name: username,
            course: users[username].course
        };
        localStorage.setItem('student', JSON.stringify(student));

        // Переходим на страницу личного кабинета
        window.location.href = 'dashboard.html';
    } else {
        // Ошибка, если имя или пароль неверные
        document.getElementById('error').textContent = 'Неверное имя пользователя или пароль';
    }
});


