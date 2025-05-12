// Пример базы данных учеников
const students = {
  "Dana": {
    password: "1234",
    course: "Французский для начинающих",
    lessons: [
      { title: "Урок 1. Приветствие", link: "lessons/lesson1.html", unlocked: true },
      { title: "Урок 2. Алфавит", link: "lessons/lesson2.html", unlocked: false },
      { title: "Урок 3. Знакомство", link: "lessons/lesson3.html", unlocked: false },
      { title: "Урок 4. Числа", link: "lessons/lesson4.html", unlocked: false },
      { title: "Урок 5. Дни недели", link: "lessons/lesson5.html", unlocked: false },
      { title: "Урок 6. Вопросы", link: "lessons/lesson6.html", unlocked: false },
      { title: "Урок 7. Глаголы", link: "lessons/lesson7.html", unlocked: false },
      { title: "Урок 8. Отрицания", link: "lessons/lesson8.html", unlocked: false },
      { title: "Урок 9. Прошедшее время", link: "lessons/lesson9.html", unlocked: false },
      { title: "Урок 10. Итог", link: "lessons/lesson10.html", unlocked: false }
    ]
  },
  "Alex": {
    password: "abcd",
    course: "Английский для начинающих",
    lessons: [
      { title: "Lesson 1", link: "lessons/en1.html", unlocked: true },
      { title: "Lesson 2", link: "lessons/en2.html", unlocked: false }
    ]
  }
};

// Логика входа
function login() {
  const name = document.getElementById("name-input").value;
  const password = document.getElementById("password-input").value;

  const user = students[name];

  if (user && user.password === password) {
    // Сохраняем имя для дальнейшего использования
    localStorage.setItem("studentName", name);
    showDashboard(name);
  } else {
    alert("Неверное имя или пароль.");
  }
}

// Отображение личного кабинета
function showDashboard(name) {
  const user = students[name];
  if (!user) return;

  document.getElementById("login-section").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  document.getElementById("student-name").textContent = name;
  document.getElementById("student-course").textContent = user.course;

  const lessonList = document.getElementById("lesson-list");
  lessonList.innerHTML = "";

  let completedLessons = 0;

  user.lessons.forEach((lesson, index) => {
    const li = document.createElement("li");
    li.style.margin = "0.5rem 0";

    if (lesson.unlocked) {
      const link = document.createElement("a");
      link.href = lesson.link;
      link.textContent = lesson.title;
      link.className = "button";
      li.appendChild(link);
      completedLessons++;
    } else {
      const locked = document.createElement("span");
      locked.textContent = `${lesson.title} 🔒`;
      locked.style.color = "#999";
      li.appendChild(locked);
    }

    lessonList.appendChild(li);
  });

  const progressPercent = Math.floor((completedLessons / user.lessons.length) * 100);
  document.getElementById("progress").textContent = progressPercent;
}

// Автоматически показать кабинет, если уже вошли
window.onload = () => {
  const savedName = localStorage.getItem("studentName");
  if (savedName && students[savedName]) {
    showDashboard(savedName);
  }
};

function logout() {
  localStorage.removeItem("studentName");
  location.reload();
}

