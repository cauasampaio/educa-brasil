document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MODO ESCURO
    const themeToggleBtns = document.querySelectorAll('[id^="theme-toggle"]');
    const htmlElement = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    };

    const savedTheme = localStorage.getItem('color-theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    applyTheme(savedTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = htmlElement.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('color-theme', newTheme);
        });
    });

    // 2. MENU SIDEBAR
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('menu-close-btn');
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('menu-overlay');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('translate-x-full');
            overlay?.classList.toggle('hidden');
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.add('translate-x-full');
            overlay?.classList.add('hidden');
        });
    }

    // 3. CONTADORES (NÚMEROS SUBINDO)
    const contadores = document.querySelectorAll('.contador');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || '';
                let current = 0;
                const step = target / 50;

                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.innerText = target + suffix;
                        clearInterval(counter);
                    } else {
                        el.innerText = Math.ceil(current) + suffix;
                    }
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    contadores.forEach(c => observer.observe(c));
});