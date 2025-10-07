// Inicializar AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Ocultar pantalla de carga
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1000);
    
    document.querySelectorAll('.page-transition').forEach(el => {
        el.classList.add('visible');
    });
});

// Toggle de tema oscuro/claro
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');
const html = document.documentElement;

// Verificar preferencia del sistema o tema guardado
if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    html.classList.remove('dark');
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleDarkIcon.classList.add('hidden');
    themeToggleLightIconMobile.classList.remove('hidden');
    themeToggleDarkIconMobile.classList.add('hidden');
} else {
    html.classList.add('dark');
    themeToggleLightIcon.classList.add('hidden');
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleLightIconMobile.classList.add('hidden');
    themeToggleDarkIconMobile.classList.remove('hidden');
}

// Función para alternar tema
function toggleTheme() {
    // Alternar iconos desktop
    themeToggleLightIcon.classList.toggle('hidden');
    themeToggleDarkIcon.classList.toggle('hidden');
    
    // Alternar iconos mobile
    themeToggleLightIconMobile.classList.toggle('hidden');
    themeToggleDarkIconMobile.classList.toggle('hidden');
    
    // Si está configurado en modo oscuro
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Alternar tema - Desktop
themeToggle.addEventListener('click', toggleTheme);

// Alternar tema - Mobile
themeToggleMobile.addEventListener('click', toggleTheme);

// Toggle de menú móvil - VERSIÓN CORREGIDA
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', function() {
    // Alternar clase hidden en el menú
    mobileMenu.classList.toggle('hidden');
    
    // Alternar clase active en el botón
    this.classList.toggle('active');
    
    // Cerrar menú al hacer clic fuera de él
    if (!mobileMenu.classList.contains('hidden')) {
        // Agregar event listener para cerrar al hacer clic fuera
        setTimeout(() => {
            document.addEventListener('click', closeMenuOnClickOutside);
        }, 10);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
});

// Función para cerrar menú al hacer clic fuera
function closeMenuOnClickOutside(event) {
    if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('hidden');
        menuBtn.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Cerrar menú móvil al hacer clic en un enlace - VERSIÓN CORREGIDA
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        menuBtn.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    });
});

// Cerrar menú al cambiar el tamaño de la ventana (si se hace más grande)
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) { // breakpoint md de Tailwind
        mobileMenu.classList.add('hidden');
        menuBtn.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
});
// Smooth scroll para enlaces internos
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

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos con clase page-transition
document.querySelectorAll('.page-transition').forEach(el => {
    observer.observe(el);
});

// Sistema de cambio de idioma
const languageToggle = document.getElementById('language-toggle');
const languageToggleMobile = document.getElementById('language-toggle-mobile');
const languageIcon = document.getElementById('language-icon');
const languageIconMobile = document.getElementById('language-icon-mobile');
let currentLanguage = 'es';

// Textos en diferentes idiomas
const translations = {
    es: {
        about_nav: 'Sobre mí',
        skills_nav: 'Habilidades',
        experience_nav: 'Experiencia',
        projects_nav: 'Proyectos',
        contact_nav: 'Contacto',
        welcome: '¡Bienvenido a mi portfolio!',
        role: 'Desarrollador Fullstack | Analista Funcional | QA',
        contact: 'Contactame',
        view_projects: 'Ver Proyectos',
        explore: 'Explorar más',
        about: '//',
        about_title: 'Sobre mí',
        about_text: 'Técnico Universitario en Informática (UNGS, 2025) y estudiante avanzado de Licenciatura en Sistemas. Experiencia en desarrollo y testing de software, análisis de requerimientos y gestión de proyectos ágiles. Conocimientos en Power BI, bases de datos y herramientas de análisis.',
        download_cv: 'Descargar CV',
        skills_title: 'Habilidades Técnicas',
        skills_text: 'Conjunto de habilidades que he adquirido a lo largo de mi formación académica y proyectos personales',
        functional_analysis: 'Análisis Funcional',
        analysis_item1: 'Casos de Uso',
        analysis_item2: 'Modelado UML',
        analysis_item3: 'Documentación',
        analysis_item4: 'Requerimientos',
        analysis_item5: 'Stakeholders',
        analysis_item6: 'Prototipos',
        testing_qa: 'Testing / QA',
        testing_item1: 'Testing Manual',
        testing_item2: 'Gestión de Bugs',
        testing_item3: 'Automatización',
        testing_item4: 'APIs Testing',
        development_tools: 'Desarrollo y Herramientas',
        experience_title: 'Experiencia Profesional',
        experience_text: 'Mi trayectoria profesional en el ámbito del desarrollo de software',
        projects_title: 'Proyectos',
        projects_text: 'Algunos de los proyectos en los que he trabajado, demostrando mis habilidades técnicas y capacidad de resolución de problemas',
        contact_title: 'Contacto',
        rights: 'Todos los derechos reservados.'
    },
    en: {
        about_nav: 'About Me',
        skills_nav: 'Skills',
        experience_nav: 'Experience',
        projects_nav: 'Projects',
        contact_nav: 'Contact',
        welcome: 'Welcome to my portfolio!',
        role: 'Fullstack Developer | Functional Analyst | QA',
        contact: 'Contact Me',
        view_projects: 'View Projects',
        explore: 'Explore More',
        about: '//',
        about_title: 'About Me',
        about_text: 'University Technician in Computer Science (UNGS, 2025) and advanced student of Systems Engineering. Experience in software development and testing, requirements analysis, and agile project management. Knowledge in Power BI, databases, and analysis tools.',
        download_cv: 'Download CV',
        skills_title: 'Technical Skills',
        skills_text: 'Set of skills I have acquired throughout my academic training and personal projects',
        functional_analysis: 'Functional Analysis',
        analysis_item1: 'Use Cases',
        analysis_item2: 'UML Modeling',
        analysis_item3: 'Documentation',
        analysis_item4: 'Requirements',
        analysis_item5: 'Stakeholders',
        analysis_item6: 'Prototypes',
        testing_qa: 'Testing / QA',
        testing_item1: 'Manual Testing',
        testing_item2: 'Bug Management',
        testing_item3: 'Automation',
        testing_item4: 'APIs Testing',
        development_tools: 'Development and Tools',
        experience_title: 'Professional Experience',
        experience_text: 'My professional career in software development',
        projects_title: 'Projects',
        projects_text: 'Some of the projects I have worked on, demonstrating my technical skills and problem-solving abilities',
        contact_title: 'Contact',
        rights: 'All rights reserved.'
    }
};

// Función para cambiar idioma
function changeLanguage() {
    // Aplicar transición de opacidad
    document.querySelectorAll('.language-transition').forEach(el => {
        el.style.opacity = '0';
    });
    
    setTimeout(() => {
        currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
        languageIcon.textContent = currentLanguage === 'es' ? 'ES' : 'EN';
        languageIconMobile.textContent = currentLanguage === 'es' ? 'ES' : 'EN';
        
        // Actualizar textos
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[currentLanguage][key]) {
                el.textContent = translations[currentLanguage][key];
            }
        });
        
        // Restaurar opacidad
        document.querySelectorAll('.language-transition').forEach(el => {
            el.style.opacity = '1';
        });
    }, 150);
}

// Cambiar idioma - Desktop
languageToggle.addEventListener('click', changeLanguage);

// Cambiar idioma - Mobile
languageToggleMobile.addEventListener('click', changeLanguage);

// Scroll indicator functionality
const scrollDots = document.querySelectorAll('.scroll-dot');
const sections = document.querySelectorAll('section[id]');

function updateScrollIndicator() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    scrollDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });
}

scrollDots.forEach(dot => {
    dot.addEventListener('click', function() {
        const targetSection = this.getAttribute('data-section');
        const targetElement = document.getElementById(targetSection);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', updateScrollIndicator);
updateScrollIndicator(); // Initialize on page load