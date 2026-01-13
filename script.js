document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. SCROLL ANIMATION OBSERVER
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const slideContainers = document.querySelectorAll('.slide-container');
    slideContainers.forEach(container => {
        observer.observe(container);
    });

    // ============================================
    // 2. SISTEMA DE PARTÍCULAS
    // ============================================
    function createParticles() {
        const container = document.createElement('div');
        container.className = 'particles-container';
        document.body.prepend(container);

        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 20) + 's';
            container.appendChild(particle);
        }
    }
    createParticles();

    // ============================================
    // 3. EFECTO PARALLAX EN SCROLL
    // ============================================
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const images = document.querySelectorAll('.img-container img');

        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;

            if (visible) {
                const speed = 0.3;
                const yPos = (rect.top - window.innerHeight / 2) * speed;
                img.style.transform = `translateY(${yPos * 0.1}px) scale(1.05)`;
            }
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ============================================
    // 4. EFECTO TYPING
    // ============================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        element.classList.add('typing-cursor');

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing-cursor');
            }
        }
        type();
    }

    // Aplicar efecto typing al subtítulo principal cuando sea visible
    const mainSubtitle = document.querySelector('.slide-container:first-child .slide-subtitle');
    if (mainSubtitle) {
        const originalText = mainSubtitle.textContent;
        const subtitleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(mainSubtitle, originalText, 80);
                    subtitleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        subtitleObserver.observe(mainSubtitle);
    }

    // ============================================
    // 5. HOVER 3D EN CARDS
    // ============================================
    const cards = document.querySelectorAll('.glass-card, .tile');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // 6. ANIMACIÓN DE CONTADORES
    // ============================================
    function animateValue(element, start, end, duration) {
        const startTimestamp = Date.now();
        const step = () => {
            const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    // ============================================
    // 7. CURSOR PERSONALIZADO (opcional)
    // ============================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Agregar efectos de hover al cursor
    const interactiveElements = document.querySelectorAll('a, button, .btn-fantastic, .tile, .glass-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // ============================================
    // 8. LAZY LOADING DE IMÁGENES
    // ============================================
    const images = document.querySelectorAll('.img-container img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    images.forEach(img => imageObserver.observe(img));

    // ============================================
    // 9. SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.querySelector('.scroll-progress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    }

    // ============================================
    // 10. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    // ============================================
    // 11. BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.querySelector('.back-to-top');

    function updateBackToTop() {
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // 12. ACTIVE NAV DOTS
    // ============================================
    const sections = document.querySelectorAll('.slide-container[id]');
    const navDots = document.querySelectorAll('.nav-dot');
    const navLinks = document.querySelectorAll('.navbar-links a');

    function updateActiveSection() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update dots
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });

        // Update navbar links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });

        // Update bottom nav (mobile)
        const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + currentSection) {
                item.classList.add('active');
            }
        });
    }

    // ============================================
    // 13. NAVBAR MOBILE TOGGLE
    // ============================================
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navbarLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbarToggle.classList.remove('active');
                navbarLinks.classList.remove('active');
            });
        });
    }

    // ============================================
    // 14. COMBINED SCROLL LISTENER
    // ============================================
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateNavbar();
        updateBackToTop();
        updateActiveSection();
    });

    // Initial calls
    updateScrollProgress();
    updateNavbar();
    updateBackToTop();
    updateActiveSection();

    // ============================================
    // 15. RIPPLE EFFECT EN BOTONES
    // ============================================
    const buttons = document.querySelectorAll('.btn-fantastic');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Crear elemento ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            // Calcular posición del click
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            // Remover después de la animación
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ============================================
    // 16. FEEDBACK VISUAL EN CARDS Y TILES
    // ============================================
    const clickables = document.querySelectorAll('.tile, .glass-card');

    clickables.forEach(element => {
        element.addEventListener('click', function () {
            // Agregar clase de feedback
            this.classList.add('clicked');

            // Remover después de la animación
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });

    // ============================================
    // 17. SOCIAL ICONS ANIMATION
    // ============================================
    const socialIcons = document.querySelectorAll('.social-icon');

    socialIcons.forEach(icon => {
        icon.addEventListener('click', function (e) {
            // Prevenir navegación por ahora (placeholder)
            if (this.href === '#') {
                e.preventDefault();
            }

            // Agregar efecto de pulso
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 400);
        });
    });
});
