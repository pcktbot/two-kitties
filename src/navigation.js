async function loadNav () {
  const navElements = await fetch('http://localhost:3000/api/navigation');
  const navElementsJson = await navElements.json();
  const nav = document.querySelector('.navigation');
  const unorderedEl = createEl('ul.nav-list');

  for (let listItem of navElementsJson) {
    const listEl = createEl('li.nav-item');
    const anchorEl = createEl('a.nav-link');
    anchorEl.href = listItem.href;
    anchorEl.textContent = listItem.name.toUpperCase();
    listEl.appendChild(anchorEl);
    unorderedEl.appendChild(listEl);

  }

  nav.insertAdjacentElement('beforeend', unorderedEl);

}

function createEl (selector) {
  const tag = selector.split('.')[0];
  const classes = selector.split('.')[1];
  const id = selector.startsWith('#') ? selector.substring(1) : null;
  
  const element = document.createElement(tag);
  
  if (classes) element.classList.add(...classes.split(' '));
  
  if (id) { element.id = id; }
  
  return element;
}

document.addEventListener('DOMContentLoaded', loadNav);