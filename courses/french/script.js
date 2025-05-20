


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.choice-exercise').forEach(section => {
    const letters = section.querySelectorAll('.letter');
    const checkBtn = section.querySelector('.check-button');
    const resetBtn = section.querySelector('.reset-btn');
    const result = section.querySelector('.result');
    const audio = section.querySelector('audio');
    let selected = null;

    // Выбор варианта
    letters.forEach(letter => {
      letter.addEventListener('click', () => {
        letters.forEach(l => l.classList.remove('selected'));
        letter.classList.add('selected');
        selected = letter.textContent;
      });
    });

    // Проверка
    checkBtn.addEventListener('click', () => {
      if (!selected) {
        result.textContent = 'Пожалуйста, выберите вариант.';
        result.style.color = 'orange';
        return;
      }

      const correct = section.dataset.correct;
      if (selected === correct) {
        result.textContent = 'Верно!';
        result.style.color = 'green';
      } else {
        result.textContent = `Неверно. Попробуйте снова`;
        result.style.color = 'red';
      }
    });

    

    // Сброс при повторном воспроизведении аудио
    audio.addEventListener('play', () => {
      selected = null;
      letters.forEach(l => l.classList.remove('selected'));
      result.textContent = '';
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const sortExercises = document.querySelectorAll('.alphabet-sort-exercise');

  sortExercises.forEach(exercise => {
    const container = exercise.querySelector('.sortable');
    const result = exercise.querySelector('.result');
    const correctOrder = exercise.dataset.answer.split(',');
    let dragged;

    // Drag & Drop
    container.querySelectorAll('.letter').forEach(letter => {
      letter.addEventListener('dragstart', (e) => {
        dragged = letter;
        e.dataTransfer.effectAllowed = 'move';
      });

      letter.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      letter.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dragged !== letter) {
          const letters = Array.from(container.children);
          const draggedIndex = letters.indexOf(dragged);
          const targetIndex = letters.indexOf(letter);
          if (draggedIndex < targetIndex) {
            container.insertBefore(dragged, letter.nextSibling);
          } else {
            container.insertBefore(dragged, letter);
          }
        }
      });
    });

    // Check button
    exercise.querySelector('.check-sort-button').addEventListener('click', () => {
      const currentOrder = Array.from(container.children).map(el => el.textContent.trim());
      const correct = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
      result.textContent = correct ? 'Правильно!' : 'Неверно. Попробуйте снова.';
      result.style.color = correct ? 'green' : 'red';
    });
  });
});








document.querySelectorAll('.exercise').forEach(exercise => {
  const expected = exercise.dataset.answer.split(',');
  const letters = Array.from(exercise.querySelectorAll('.letter'));
  const resultDiv = exercise.querySelector('.result');
  const audio = exercise.querySelector('audio'); // добавляем поиск аудио
  let selected = [];

  letters.forEach(letter => {
    letter.addEventListener('click', () => {
      if (!letter.classList.contains('selected')) {
        letter.classList.add('selected');
        selected.push(letter.textContent);
      }
    });
  });

  exercise.querySelector('.check-btn').addEventListener('click', () => {
    const correct = JSON.stringify(selected) === JSON.stringify(expected);
    resultDiv.textContent = correct ? 'Правильно, молодец!' : 'Неверно. Попробуйте снова.';
    resultDiv.style.color = correct ? 'green' : 'red';

    // Сброс если неверно
    if (!correct) {
      selected = [];
      letters.forEach(l => l.classList.remove('selected'));
    }
  });

  // Сброс при повторном воспроизведении аудио
  if (audio) {
    audio.addEventListener('play', () => {
      selected = [];
      letters.forEach(l => l.classList.remove('selected'));
      resultDiv.textContent = '';
    });
  }
});




