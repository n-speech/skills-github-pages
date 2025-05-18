document.querySelectorAll('.exercise').forEach(exercise => {
  const expected = exercise.dataset.answer.split(',');
  const letters = Array.from(exercise.querySelectorAll('.letter'));
  const resultDiv = exercise.querySelector('.result');
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
    resultDiv.textContent = correct ? 'Правильно!' : 'Неверно. Попробуйте снова.';
    resultDiv.style.color = correct ? 'green' : 'red';

    // Сброс если неверно
    if (!correct) {
      selected = [];
      letters.forEach(l => l.classList.remove('selected'));
    }
  });
});
