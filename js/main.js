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
});

// ============ Efecto de cursor personalizado (opcional) ============
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('scale-150', 'bg-opacity-30');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('scale-150', 'bg-opacity-30');
    });
});