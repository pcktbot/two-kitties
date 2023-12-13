import ApiAdapter from './ApiAdapter.js';

const apiAdapter = new ApiAdapter({ baseUrl: 'http://localhost:3000', namespace: 'api' });

export async function loadNav () {
  const path = 'navigation';
  const url =  apiAdapter.formatUrl(path);
  const navElements = await apiAdapter.request(url);
  const nav = document.querySelector('.navigation');
  const unorderedEl = createEl('ul.nav-list');

  for (let listItem of navElements) {
    const listEl = createEl('li.nav-item');
    const anchorEl = createEl('a.nav-link');
    anchorEl.href = listItem.href;
    anchorEl.textContent = listItem.name.toUpperCase();
    listEl.appendChild(anchorEl);
    unorderedEl.appendChild(listEl);
  }

  nav.insertAdjacentElement('beforeend', unorderedEl);
}

export function createEl (selector) {
  if (!selector) throw new Error('Please provide a selector');

  const tag = selector.split(/(?=#|\.)+/)[0];
  const attributes = selector.match(/(?<=\.)([^.#]+)/g);
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