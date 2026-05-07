document.addEventListener('DOMContentLoaded', function() {
    // Altura do header fixo (ajuste conforme necessário)
    const headerHeight = document.getElementById('cabecalho').offsetHeight;

    // Seleciona todos os links de navegação
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previne o comportamento padrão
            e.preventDefault();

            // Remove active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adiciona active ao link clicado
            this.classList.add('active');

            // Pega o id do elemento alvo do link
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula a posição considerando o header fixo
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                // Scroll suave para a posição
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fecha o menu mobile se estiver aberto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    $(document).ready(function() {
        $('#telefone').inputmask('(99) 9 9999-9999');
    });
});

// Adicione este código no final do seu main.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#fale-conosco form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        const texto = `Olá, tudo bem? Me chamo ${nome}.
Telefone: ${telefone}
E-mail: ${email}

Gostaria de mais informações sobre hospedagem na Pousada Flor de Lotus.

Mensagem:
${mensagem}`;

        const numeroWhatsApp = '557399728505';

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

        window.open(url, '_blank');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const praiasSelect = document.getElementById('praias-select');

    if (praiasSelect) {
        praiasSelect.addEventListener('change', function () {
            const targetId = this.value;

            // Remove abas ativas
            const tabs = document.querySelectorAll('#praias .tab-pane');
            tabs.forEach(tab => {
                tab.classList.remove('active', 'show');
            });

            // Ativa aba selecionada
            const selectedTab = document.getElementById(targetId);
            if (selectedTab) {
                selectedTab.classList.add('active', 'show');
            }

            // Atualiza botões desktop também
            const buttons = document.querySelectorAll('.nav-praias .nav-link');
            buttons.forEach(btn => btn.classList.remove('active'));

            const activeButton = document.querySelector(
                `.nav-praias button[data-bs-target="#${targetId}"]`
            );

            if (activeButton) {
                activeButton.classList.add('active');
            }
        });
    }
});

// SUBSTITUA O CÓDIGO ANTERIOR DO BOTÃO VOLTAR POR ESTE:

document.addEventListener('DOMContentLoaded', function () {
    const botoesVoltar = document.querySelectorAll('.voltar-menu-praias');
    const topoPraias = document.getElementById('topo-praias');

    botoesVoltar.forEach(botao => {
        botao.addEventListener('click', function () {
            if (topoPraias) {
                // Ajuste extra para subir mais e mostrar o título completo
                const offset = 140;

                const elementPosition = topoPraias.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});