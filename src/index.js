(function () {

  function borderRadiusStyle (el) {
    const target = el;
  
    const corners = new Array(8).fill().map(() => generateRandomNumber(1, 100));
  
    let br = 'border-radius: ';
    corners.forEach((corner, index) => {
      br += `${corner}% `;
      if (index === 3) br += ' / ';
    });
    target.setAttribute('style', br);
  }

  function randomBackgroundColor () {
    const colorMap = [
      'black',
      'red',
      'dk-red',
      'lt-blue',
      'blue',
      'yellow',
      'silver'
    ];

      return colorMap[generateRandomNumber(0, colorMap.length - 1)];
    }

  function generateRandomNumber(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

  const items = document.querySelectorAll('.item');
  items.forEach((item) => {
    setInterval(borderRadiusStyle, generateRandomNumber(1, 20) * 100, item);
    item.addEventListener('click', (e) => {
      for (let i = 0; i < e.target.classList.length; i++) {
        if (!e.target.classList[i].includes('item')) {
          e.target.classList.remove(e.target.classList[i]);
        }
      }
      e.target.classList.add(randomBackgroundColor());
    });
  });
})();
