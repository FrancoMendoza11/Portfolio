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
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        const html = document.documentElement;

        // Verificar preferencia del sistema o tema guardado
        if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: light)').matches)) {
            html.classList.remove('dark');
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
        } else {
            html.classList.add('dark');
            themeToggleLightIcon.classList.add('hidden');
            themeToggleDarkIcon.classList.remove('hidden');
        }

        // Alternar tema
        themeToggle.addEventListener('click', function() {
            // Alternar iconos
            themeToggleLightIcon.classList.toggle('hidden');
            themeToggleDarkIcon.classList.toggle('hidden');
            
            // Si está configurado en modo oscuro
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Toggle de menú móvil
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animación de hamburguesa a X
            const spans = menuBtn.querySelectorAll('span');
            if (mobileMenu.classList.contains('hidden')) {
                spans[0].style.transform = 'none';
                spans[1].style.width = '80%';
                spans[2].style.transform = 'none';
            } else {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.width = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        });

        // Cerrar menú móvil al hacer clic en un enlace
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.width = '80%';
                spans[2].style.transform = 'none';
            });
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

        // Formulario de contacto
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.getElementById('success-message');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí normalmente enviarías el formulario a un servidor
            // Por ahora, solo mostraremos el mensaje de éxito
            
            // Mostrar mensaje de éxito
            successMessage.classList.add('show');
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            
            // Limpiar formulario
            contactForm.reset();
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
        const languageIcon = document.getElementById('language-icon');
        let currentLanguage = 'es';

        // Textos en diferentes idiomas
        const translations = {
            es: {
                about_nav: 'Sobre mí',
                skills_nav: 'Habilidades',
                experience_nav: 'Experiencia',
                contact_nav: 'Contacto',
                welcome: '¡Bienvenido a mi portfolio!',
                role: 'Analista Funcional | Desarrollo Backend | QA',
                contact: 'Contactame',
                view_projects: 'Ver Proyectos',
                explore: 'Explorar más',
                about: '//',
                about_title: 'Sobre mí',
                about_text: 'Técnico Universitario en Informática (UNGS, 2025) y estudiante avanzado de Licenciatura en Sistemas. Experiencia en desarrollo y testing de software, análisis de requerimientos y gestión de proyectos ágiles. Conocimientos en Power BI, bases de datos y herramientas de análisis.',
                name: 'Nombre:',
                location: 'Ubicación:',
                availability: 'Disponibilidad:',
                download_cv: 'Descargar CV',
                skills_title: 'Habilidades Técnicas',
                skills_text: 'Conjunto de habilidades que he adquirido a lo largo de mi formación académica y proyectos personales',
                functional_analysis: 'Análisis Funcional',
                analysis_item1: 'Elaboración de casos de uso, user stories y flujos alternativos',
                analysis_item2: 'Modelado UML (diagramas de caso de uso, actividad, secuencia y clases)',
                analysis_item3: 'Documentación técnica: FRD, BRD, manuales de usuario y guías técnicas',
                analysis_item4: 'Especificación de requerimientos funcionales y no funcionales',
                analysis_item5: 'Gestión de stakeholders y validación de requerimientos',
                analysis_item6: 'Elaboración de prototipos funcionales y wireframes',
                testing_qa: 'Testing / QA',
                testing_item1: 'Testing manual: test cases, regresión, validación',
                testing_item2: 'Reporte y gestión de bugs (Jira, Trello)',
                testing_item3: 'Testing exploratorio y automatizado (Playwright, JUnit)',
                testing_item4: 'Pruebas funcionales de APIs con Postman',
                development_tools: 'Desarrollo y Herramientas',
                dev_item1: 'Lenguajes: Java, Python, C, JavaScript, HTML5, CSS3',
                dev_item2: 'Frameworks: React, Node.js, Django, Tailwind CSS',
                dev_item3: 'Bases de datos: PostgreSQL, MongoDB, SQL',
                dev_item4: 'Testing: Playwright, JUnit, Postman',
                dev_item5: 'Herramientas: Git, Power BI, Excel, Trello, Jira',
                dev_item6: 'Sistemas operativos: Linux, Windows',
                experience_title: 'Experiencia Profesional',
                contact_title: 'Contacto',
                contact_text: '¿Interesado en trabajar juntos? No dudes en contactarme',
                contact_form: 'Formulario de Contacto',
                name_label: 'Nombre',
                subject_label: 'Asunto',
                message_label: 'Mensaje',
                send_message: 'Enviar Mensaje',
                contact_info: 'Información de Contacto',
                available: 'Disponible para proyectos y oportunidades laborales',
                success_title: '¡Mensaje enviado!',
                success_message: 'Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo pronto.',
                copyright: '© 2024 Franco Mendoza. Todos los derechos reservados.'
            },
            en: {
                about_nav: 'About Me',
                skills_nav: 'Skills',
                experience_nav: 'Experience',
                contact_nav: 'Contact',
                welcome: 'Welcome to my portfolio!',
                role: 'Functional Analyst | Backend Development | QA',
                contact: 'Contact Me',
                view_projects: 'View Projects',
                explore: 'Explore More',
                about: '//',
                about_title: 'About Me',
                about_text: 'University Technician in Computer Science (UNGS, 2025) and advanced student of Systems Engineering. Experience in software development and testing, requirements analysis, and agile project management. Knowledge in Power BI, databases, and analysis tools.',
                name: 'Name:',
                location: 'Location:',
                availability: 'Availability:',
                download_cv: 'Download CV',
                skills_title: 'Technical Skills',
                skills_text: 'Set of skills I have acquired throughout my academic training and personal projects',
                functional_analysis: 'Functional Analysis',
                analysis_item1: 'Development of use cases, user stories and alternative flows',
                analysis_item2: 'UML modeling (use case, activity, sequence and class diagrams)',
                analysis_item3: 'Technical documentation: FRD, BRD, user manuals and technical guides',
                analysis_item4: 'Specification of functional and non-functional requirements',
                analysis_item5: 'Stakeholder management and requirements validation',
                analysis_item6: 'Development of functional prototypes and wireframes',
                testing_qa: 'Testing / QA',
                testing_item1: 'Manual testing: test cases, regression, validation',
                testing_item2: 'Bug reporting and management (Jira, Trello)',
                testing_item3: 'Exploratory and automated testing (Playwright, JUnit)',
                testing_item4: 'API functional testing with Postman',
                development_tools: 'Development and Tools',
                dev_item1: 'Languages: Java, Python, C, JavaScript, HTML5, CSS3',
                dev_item2: 'Frameworks: React, Node.js, Django, Tailwind CSS',
                dev_item3: 'Databases: PostgreSQL, MongoDB, SQL',
                dev_item4: 'Testing: Playwright, JUnit, Postman',
                dev_item5: 'Tools: Git, Power BI, Excel, Trello, Jira',
                dev_item6: 'Operating Systems: Linux, Windows',
                experience_title: 'Professional Experience',
                contact_title: 'Contact',
                contact_text: 'Interested in working together? Feel free to contact me',
                contact_form: 'Contact Form',
                name_label: 'Name',
                subject_label: 'Subject',
                message_label: 'Message',
                send_message: 'Send Message',
                contact_info: 'Contact Information',
                available: 'Available for projects and job opportunities',
                success_title: 'Message sent!',
                success_message: 'Your message has been sent successfully. I will contact you soon.',
                copyright: '© 2024 Franco Mendoza. All rights reserved.'
            }
        };

        // Cambiar idioma
        languageToggle.addEventListener('click', function() {
            // Aplicar transición de opacidad
            document.querySelectorAll('.language-transition').forEach(el => {
                el.style.opacity = '0';
            });
            
            setTimeout(() => {
                currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
                languageIcon.textContent = currentLanguage === 'es' ? 'ES' : 'EN';
                
                // Actualizar textos
                document.querySelectorAll('.language-transition').forEach(el => {
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
        });

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