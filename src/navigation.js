export async function loadNav () {
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

export function createEl(selector) {
  if (!selector) throw new Error('Please provide a selector');

  const tag = selector.split(/(?=#|\.)+/)[0];
  const attributes = selector.match(/(?<=\.)([^.#]+)/g);
  console.log('#createEl', { tag, attributes });
  const element = document.createElement(tag);
  const id = selector.match(/(?<=#)([^.#]+)/g);
  if (id) element.id = id[0];
  if (attributes) {
    for (let attribute of attributes) {
      element.classList.add(attribute);
    }
  }

  return element;
}

document.addEventListener('DOMContentLoaded', loadNav);