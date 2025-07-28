document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        menuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.classList.remove('active');
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando Fetch API o Formspree
            
            // Ejemplo básico de feedback al usuario
            alert('Gracias por tu mensaje. Me pondré en contacto contigo pronto.');
            contactForm.reset();
        });
    }

    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});