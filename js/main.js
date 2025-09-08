document.addEventListener('DOMContentLoaded', function() {
    // ============ Modo oscuro/claro ============
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    
    // Verificar preferencias al cargar
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    }
    
    // Manejar el cambio de tema
    themeToggleBtn.addEventListener('click', function() {
        // Alternar iconos
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');
        
        // Alternar clase dark
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Agregar transición suave
        document.documentElement.classList.add('transition-colors');
        setTimeout(() => {
            document.documentElement.classList.remove('transition-colors');
        }, 500);
    });

    // ============ Menú móvil ============
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.toggle('hidden');
        
        // Animación de hamburguesa a X
        const bars = menuBtn.querySelectorAll('span');
        if (isOpen) {
            bars[0].style.transform = 'rotate(0) translateY(0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translateY(0)';
        } else {
            bars[0].style.transform = 'rotate(45deg) translateY(6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translateY(-6px)';
        }
    });

    // ============ Scroll suave ============
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
                
                // Cerrar menú móvil si está abierto
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuBtn.querySelectorAll('span').forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                }
            }
        });
    });

    // ============ Animaciones al hacer scroll ============
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // ============ Efecto de carga inicial ============
    setTimeout(() => {
        document.body.classList.remove('opacity-0');
    }, 100);

    // ============ Cambio de idioma ============
    const languageToggleBtn = document.getElementById('language-toggle');
    const languageIcon = document.getElementById('language-icon');

    // Textos traducidos
    const translations = {
        'en': {
            'title': 'Franco Mendoza | Portfolio',
            'welcome': 'Welcome to my portfolio!',
            'role': 'Functional Analyst | Backend Development | QA',
            'contact': 'Contact me',
            'view_projects': 'View Projects',
            'explore': 'Explore more',
            'about': 'About me',
            'about_text': 'University Technician in Computer Science (UNGS, 2025) and advanced student in Systems Engineering. Specialized in functional analysis and QA, with academic experience in documentation, requirement specification and test design.',
            'name': 'Name:',
            'email': 'Email:',
            'location': 'Location:',
            'download_cv': 'Download CV',
            'skills': 'Technical Skills',
            'skills_text': 'Set of skills I have acquired throughout my academic training and personal projects',
            'experience': 'Academic/Personal Projects',
            'contact_title': 'Contact',
            'contact_text': 'Interested in working together? Send me a message!',
            'contact_info': 'Contact Information',
            'send_message': 'Send me a message',
            'message': 'Message',
            'your_name': 'Your name',
            'your_email': 'Your email',
            'write_message': 'Write your message...',
            'send': 'Send Message',
            'copyright': '© 2025 Franco Mendoza. All rights reserved.',
            'about_nav': 'About',
            'skills_nav': 'Skills',
            'experience_nav': 'Experience',
            'contact_nav': 'Contact'
        },
        'es': {
            'title': 'Franco Mendoza | Portfolio',
            'welcome': '¡Bienvenido a mi portfolio!',
            'role': 'Analista Funcional | Desarrollo Backend | QA',
            'contact': 'Contactame',
            'view_projects': 'Ver Proyectos',
            'explore': 'Explorar más',
            'about': 'Sobre mí',
            'about_text': 'Técnico Universitario en Informática (UNGS, 2025) y estudiante avanzado en Lic. en Sistemas. Especializado en análisis funcional y QA, con experiencia académica en documentación, especificación de requerimientos y diseño de pruebas.',
            'name': 'Nombre:',
            'email': 'Email:',
            'location': 'Ubicación:',
            'availability': 'Disponibilidad:',
            'download_cv': 'Descargar CV',
            'skills': 'Habilidades Técnicas',
            'skills_text': 'Conjunto de habilidades que he adquirido a lo largo de mi formación académica y proyectos personales',
            'experience': 'Proyectos Académicos/Personales Destacados',
            'contact_title': 'Contacto',
            'contact_text': '¿Interesado en trabajar juntos? ¡Enviame un mensaje!',
            'contact_info': 'Información de Contacto',
            'send_message': 'Envíame un mensaje',
            'message': 'Mensaje',
            'your_name': 'Tu nombre',
            'your_email': 'Tu email',
            'write_message': 'Escribí tu mensaje...',
            'send': 'Enviar Mensaje',
            'copyright': '© 2025 Franco Mendoza. Todos los derechos reservados.',
            'about_nav': 'Sobre mí',
            'skills_nav': 'Habilidades',
            'experience_nav': 'Experiencia',
            'contact_nav': 'Contacto'
        }
    };

    // Verificar preferencia al cargar
    const currentLanguage = localStorage.getItem('language') || 'es';
    document.documentElement.lang = currentLanguage;
    languageIcon.textContent = currentLanguage.toUpperCase();

    // Manejar el cambio de idioma
    languageToggleBtn.addEventListener('click', function() {
        const newLanguage = document.documentElement.lang === 'es' ? 'en' : 'es';
        document.documentElement.lang = newLanguage;
        localStorage.setItem('language', newLanguage);
        languageIcon.textContent = newLanguage.toUpperCase();
        updateTexts(newLanguage);
    });

    // Función para actualizar todos los textos
    function updateTexts(language) {
        const langData = translations[language];
        
        // Actualizar todos los elementos con data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });
        
        // Actualizar elementos especiales
        document.querySelector('title').textContent = langData.title;
        
        // Botones de la sección Hero
        const heroButtons = document.querySelectorAll('.hero a');
        if (heroButtons[0]) heroButtons[0].textContent = langData.contact;
        if (heroButtons[1]) heroButtons[1].textContent = langData.view_projects;
        
        // Texto de explorar más
        const exploreText = document.querySelector('.hero a[href="#about"] span');
        if (exploreText) exploreText.textContent = langData.explore;
        
        // Títulos de secciones
        const aboutTitle = document.querySelector('#about h2');
        if (aboutTitle) aboutTitle.innerHTML = `<span class="text-gradient">//</span> ${langData.about}`;
        
        const skillsTitle = document.querySelector('#skills h2');
        if (skillsTitle) skillsTitle.innerHTML = `<span class="text-gradient">#</span> ${langData.skills}`;
        
        const experienceTitle = document.querySelector('#experience h2');
        if (experienceTitle) experienceTitle.innerHTML = `<span class="text-gradient">##</span> ${langData.experience}<span class="text-gradient">/</span>`;
        
        const contactTitle = document.querySelector('#contact h2');
        if (contactTitle) contactTitle.innerHTML = `<span class="text-gradient">/</span> ${langData.contact_title}`;
        
        // Placeholders del formulario
        const nameInput = document.querySelector('input[name="name"]');
        if (nameInput) nameInput.placeholder = langData.your_name;
        
        const emailInput = document.querySelector('input[name="email"]');
        if (emailInput) emailInput.placeholder = langData.your_email;
        
        const messageTextarea = document.querySelector('textarea[name="message"]');
        if (messageTextarea) messageTextarea.placeholder = langData.write_message;
        
        // Botón de enviar
        const submitButton = document.querySelector('#contact-form button');
        if (submitButton) submitButton.textContent = langData.send;
        
        // Footer
        const footerText = document.querySelector('footer p');
        if (footerText) footerText.textContent = langData.copyright;
    }

    // Inicializar textos al cargar
    updateTexts(currentLanguage);
});