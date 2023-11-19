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

  // generate random hex color
  function randomHexColor () {
    const hex = generateRandomNumber(0, 16777215).toString(16);
    return `#${hex}`;
  }

  const body = document.querySelector('body');
  body.addEventListener('click', function (event) {
    event.target.style = `background-color: ${randomHexColor()}`;
    console.log(event.target.style);
  });

  const items = document.querySelectorAll('.item');

  function onChange (event) {
    const string = event.target.value.split('');
    items.forEach((item, index) => {
      if (index >= string.length) {
        item.firstChild.textContent = '';
        return;
      }
      item.firstChild.textContent = string[index];
    })
  }

  const input = document.querySelector('.input');
  const clearBtn = document.querySelector('a.clear');
  clearBtn.addEventListener('click', () => {
    input.value = null;
    onChange({target: input});
  });
  input.value = null;
  input.addEventListener('input', onChange);
  input.addEventListener('click', (e) => e.stopPropagation());
  
  function update (string) {
    for (let i = 0; i < string.length; i++) {
      items[i].innerHTML = string[i];
    }
  }

  items.forEach((item, index) => {
    // item.firstChild.textContent = index;
    setInterval(borderRadiusStyle, generateRandomNumber(1, 20) * 100, item);
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      for (let i = 0; i < e.target.classList.length; i++) {
        if (!e.target.classList[i].includes('item')) {
          e.target.classList.remove(e.target.classList[i]);
        }
      }
      e.target.classList.add(randomBackgroundColor());
    });
  });
})();
