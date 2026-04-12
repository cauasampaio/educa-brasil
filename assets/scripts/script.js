// Garante que o script só rode quando o HTML estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica do Modo Escuro (Dark Mode) ---
    // Seleciona todos os botões de troca de tema (Desktop e Mobile)
    const themeToggleBtns = document.querySelectorAll('[id^="theme-toggle"]');
    
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Alterna a classe 'dark' no elemento raiz (html)
            document.documentElement.classList.toggle('dark');
            
            // Salva a preferência do usuário no navegador para manter o tema ao recarregar
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
        });
    });

    // --- Controle do Menu Lateral (Sidebar Mobile) ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('menu-close-btn');
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('menu-overlay');

    // Abre o menu removendo o deslocamento lateral e exibindo o fundo escuro
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.remove('translate-x-full');
            overlay?.classList.remove('hidden');
        });
    }

    // Fecha o menu aplicando o deslocamento lateral e escondendo o fundo
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.add('translate-x-full');
            overlay?.classList.add('hidden');
        });
    }

    // --- Animação dos Contadores Numéricos ---
    const contadores = document.querySelectorAll('.contador');
    
    // IntersectionObserver dispara a animação apenas quando os números entram na tela
    const observerContadores = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || '';
                const isDecimal = el.getAttribute('data-decimal') === 'true';
                let count = 0;
                
                // Define a suavidade da subida: quanto maior o alvo, maior o salto por frame
                const increment = target / 50; 

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        // Formatação: valida se o número deve exibir casas decimais
                        el.innerText = (isDecimal ? count.toFixed(1) : Math.ceil(count)) + suffix;
                        setTimeout(updateCount, 30); // Taxa de atualização de 30ms para fluidez
                    } else {
                        // Garante que o valor final seja exatamente o definido no atributo data-target
                        el.innerText = (isDecimal ? target.toFixed(1) : target) + suffix;
                    }
                };
                
                updateCount();
                // Cancela a observação após a execução para poupar memória e processamento
                observerContadores.unobserve(el); 
            }
        });
    }, { threshold: 0.5 }); // Inicia quando pelo menos 50% do elemento estiver visível

    contadores.forEach(c => observerContadores.observe(c));

    // --- Carrossel de Depoimentos/Vídeos ---
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    let currentIndex = 0;

    if (track && dots.length > 0) {
        // Função central para atualizar a posição do slide e os indicadores visuais
        const updateCarousel = (index) => {
            // Desloca o trilho horizontalmente com base no índice atual
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // Atualiza os indicadores (dots) para refletir o slide ativo
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-brand-green', i === index);
                dot.classList.toggle('w-8', i === index);
                dot.classList.toggle('bg-gray-300', i !== index);
                dot.classList.toggle('w-2.5', i !== index);
            });
            currentIndex = index;
        };

        // Navegação para o próximo slide (retorna ao início se chegar no fim)
        nextBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % dots.length;
            updateCarousel(currentIndex);
        });

        // Navegação para o slide anterior (vai ao fim se retroceder do início)
        prevBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + dots.length) % dots.length;
            updateCarousel(currentIndex);
        });

        // Permite clicar diretamente nos indicadores para navegar
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => updateCarousel(i));
        });
    }

    const copyBtn = document.getElementById('copy-link-btn');
    const copyMsg = document.getElementById('copy-message');

    if (copyBtn && copyMsg) {
        copyBtn.addEventListener('click', () => {
            // Pega o link atual do site
            const siteUrl = window.location.href;

            // Copia para a área de transferência
            navigator.clipboard.writeText(siteUrl).then(() => {
                // Mostra a mensagem (tira o opacity-0)
                copyMsg.classList.remove('opacity-0');
                copyMsg.classList.add('opacity-100');

                // Esconde de novo depois de 2 segundos
                setTimeout(() => {
                    copyMsg.classList.remove('opacity-100');
                    copyMsg.classList.add('opacity-0');
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar: ', err);
            });
        });
    }
    const header = document.querySelector('header');
    const brandName = document.getElementById('brand-name');
    const navLinks = document.querySelectorAll('nav ul li a:not(.bg-brand-green)'); 

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-brand-white', 'dark:bg-[#0F172A]', 'shadow-md');
            header.classList.remove('bg-transparent');
            
            brandName?.classList.add('text-brand-blue');
            brandName?.classList.remove('text-white');
            menuBtn?.classList.add('text-brand-blue');
            menuBtn?.classList.remove('text-white');

            navLinks.forEach(link => {
                link.classList.add('text-brand-blue');
                link.classList.remove('text-white');
            });

        } else {
            header.classList.add('bg-transparent');
            header.classList.remove('bg-brand-white', 'dark:bg-[#0F172A]', 'shadow-md');
            
            brandName?.classList.remove('text-brand-blue');
            brandName?.classList.add('text-white');
            menuBtn?.classList.remove('text-brand-blue');
            menuBtn?.classList.add('text-white');

            navLinks.forEach(link => {
                link.classList.remove('text-brand-blue');
                link.classList.add('text-white');
            });
        }
    });

});