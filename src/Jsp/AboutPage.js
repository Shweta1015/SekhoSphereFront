const menu = document.querySelector('.nav__menu');
const navLinks = document.querySelector('.nav__links');

menu.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
