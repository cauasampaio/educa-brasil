// --- 1. LÓGICA DO CABEÇALHO AO ROLAR A TELA ---
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
            colors: {
                brand: {
                    white: '#FFFF',
                    yellow: '#EEFF00',
                    orange: '#DF6836',
                    'orange-hover': '#c5572b',
                    gray: '#666666',
                    green: '#1B5E3F',
                    salmon: '#F5E6D3',
                }
            }
        }
    }
}

const header = document.getElementById('main-header');
const hamburgerIcon = document.getElementById('hamburger-icon');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Rola para baixo: Fundo branco, com sombra, menos padding (py-3)
        header.classList.remove('bg-transparent', 'py-5');
        header.classList.add('bg-white', 'shadow-md', 'py-3');
        // Muda o ícone para preto
        hamburgerIcon.classList.remove('text-white');
        hamburgerIcon.classList.add('text-black');
    } else {
        // Volta ao topo: Fundo transparente, padding original
        header.classList.add('bg-transparent', 'py-5');
        header.classList.remove('bg-white', 'shadow-md', 'py-3');
        // Muda o ícone de volta para branco
        hamburgerIcon.classList.add('text-white');
        hamburgerIcon.classList.remove('text-black');
    }
});

// --- 2. LÓGICA DO MENU OFF CANVAS (Deslizar) ---
const menuOpenBtn = document.getElementById('menu-open-btn');
const menuCloseBtn = document.getElementById('menu-close-btn');
const sidebarMenu = document.getElementById('sidebar-menu');

// Abrir: Remove a classe que esconde (translate-x-full) e adiciona a que mostra (translate-x-0)
menuOpenBtn.addEventListener('click', () => {
    sidebarMenu.classList.remove('translate-x-full');
    sidebarMenu.classList.add('translate-x-0');
});

// Fechar: Faz o inverso
menuCloseBtn.addEventListener('click', () => {
    sidebarMenu.classList.remove('translate-x-0');
    sidebarMenu.classList.add('translate-x-full');
});

// --- ANIMAÇÃO DE CONTADOR DOS NÚMEROS ---

// Função que faz a matemática de contar
function animarContador(elemento) {
    const target = parseFloat(elemento.getAttribute('data-target')); // Pega o número final
    const suffix = elemento.getAttribute('data-suffix'); // Pega o 'mil', 'M' ou '%'
    const isDecimal = elemento.getAttribute('data-decimal') === 'true'; // Verifica se é quebrado
    
    const duration = 1000; // Duração da animação em milissegundos (2 segundos)
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        
        // Calcula o progresso (de 0 a 1)
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Efeito ease-out (começa rápido e vai freando no finalzinho, fica bem elegante)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        // Calcula o número atual
        const currentNumber = easeProgress * target;

        // Atualiza o texto na tela formatando se tem vírgula (ponto) ou não
        if (isDecimal) {
            elemento.innerText = currentNumber.toFixed(1) + suffix;
        } else {
            elemento.innerText = Math.floor(currentNumber) + suffix;
        }

        // Se ainda não chegou no 1 (100%), continua a animação
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Garante que o número final fique exato no final da animação
            elemento.innerText = target + suffix;
        }
    };

    window.requestAnimationFrame(step);
}

// O "Olheiro" (Observer) que avisa quando os cards aparecem na tela
const observerContador = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Se o card entrou na tela do usuário
        if (entry.isIntersecting) {
            animarContador(entry.target); // Roda a animação
            observer.unobserve(entry.target); // Para de observar para não rodar de novo se o cara subir a tela
        }
    });
}, { threshold: 0.5 }); // Só roda quando 50% do card estiver visível

// Pega todos os elementos com a classe .contador e bota o "olheiro" pra vigiar eles
document.querySelectorAll('.contador').forEach(contador => {
    observerContador.observe(contador);
});