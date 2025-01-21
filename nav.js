// Seleccionar elementos
const toggleButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Alternar el menú al hacer clic
toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

