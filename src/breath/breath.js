const letters = document.querySelectorAll('.item');

letters.forEach((letter, i) => {
  letter.style.animationDelay = `${i * 0.5}s`;
});