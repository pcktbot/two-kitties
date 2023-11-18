async function loadNav () {
  const navElements = await fetch('http://localhost:3000/api/navigation');
  const navElementsJson = await navElements.json();
  const nav = document.querySelector('.navigation');
  const navList = document.createElement('ul');
  navList.classList.add('nav-list');
  navElementsJson.forEach(function (el) {
    const navItem = document.createElement('li');
    navItem.classList.add('nav-item');
    const navLink = document.createElement('a');
    navLink.classList.add('nav-link');
    navLink.setAttribute('href', `${el}/`);
    navLink.textContent = el.toUpperCase();
    navItem.appendChild(navLink);
    navList.appendChild(navItem);
  });
  nav.appendChild(navList);
}

document.addEventListener('DOMContentLoaded', loadNav);