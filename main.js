document.addEventListener('DOMContentLoaded', function () {
    // Altura do header fixo
    const headerHeight = document.getElementById('cabecalho').offsetHeight;

    // Links do menu principal
    const navLinks = document.querySelectorAll('.nav-link');

    // =========================
    // NAVEGAÇÃO SUAVE CORRIGIDA
    // =========================
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active
            navLinks.forEach(l => l.classList.remove('active'));

            // Ativa clicado
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                let offset;

                // Ajuste para celular/tablet
                if (window.innerWidth < 992) {
                    offset = headerHeight + 235;
                } else {
                    // Desktop
                    offset = headerHeight + 20;
                }

                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });

                // Fecha menu mobile
                const navbarCollapse = document.querySelector('.navbar-collapse');

                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse =
                        bootstrap.Collapse.getInstance(navbarCollapse) ||
                        new bootstrap.Collapse(navbarCollapse);

                    bsCollapse.hide();
                }
            }
        });
    });

    // =========================
    // MÁSCARA TELEFONE
    // =========================
    $('#telefone').inputmask('(99) 9 9999-9999');

    // =========================
    // FORMULÁRIO WHATSAPP
    // =========================
    const form = document.querySelector('#fale-conosco form');

    if (form) {
        form.addEventListener('submit', function (e) {
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
    }

    // SUBSTITUA TODO O BLOCO DO DROPDOWN PRAIAS POR ESTE:

    const praiasSelect = document.getElementById('praias-select');

    if (praiasSelect) {

        praiasSelect.addEventListener('change', function () {
            const targetId = this.value;

            // Remove de todas
            document.querySelectorAll('#praias .tab-pane').forEach(tab => {
                tab.classList.remove('active', 'show');
            });

            // Ativa selecionada
            const selectedTab = document.getElementById(targetId);

            if (selectedTab) {
                selectedTab.classList.add('active', 'show');
            }

            // Atualiza menu lateral
            document.querySelectorAll('.nav-praias .nav-link').forEach(btn => {
                btn.classList.remove('active');
            });

            const activeButton = document.querySelector(
                `.nav-praias button[data-bs-target="#${targetId}"]`
            );

            if (activeButton) {
                activeButton.classList.add('active');
            }
        });

        // Estado inicial correto
        const initialTarget = praiasSelect.value;

        document.querySelectorAll('#praias .tab-pane').forEach(tab => {
            tab.classList.remove('active', 'show');
        });

        const initialTab = document.getElementById(initialTarget);

        if (initialTab) {
            initialTab.classList.add('active', 'show');
        }
    }

    // =========================
    // BOTÃO VOLTAR MENU PRAIAS
    // =========================
    const botoesVoltar = document.querySelectorAll('.voltar-menu-praias');
    const topoPraias = document.getElementById('topo-praias');

    botoesVoltar.forEach(botao => {
        botao.addEventListener('click', function () {
            if (topoPraias) {
                const offset = 140;

                const elementPosition =
                    topoPraias.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// SUBSTITUA SEU SCRIPT POR ESTE (ele pega o botão clicado corretamente)

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.btn-reservar').forEach(botao => {

        botao.addEventListener('click', function () {

            // PEGA O QUARTO EXATO DESTE BOTÃO
            const quarto = this.dataset.quarto;

            // Procura a caixa de reserva mais próxima desse quarto
            const reservaBox = this.closest('.reserva-box');

            const checkin = reservaBox.querySelector('.data-checkin').value;
            const checkout = reservaBox.querySelector('.data-checkout').value;

            if (!checkin || !checkout) {
                alert('Por favor, selecione check-in e check-out.');
                return;
            }

            // Campo mensagem
            const mensagem = document.getElementById('mensagem');

            if (mensagem) {
                mensagem.value =
                    `Olá! Gostaria de reservar o ${quarto}.

Período da estadia:
Check-in: ${checkin}
Check-out: ${checkout}

Poderiam me passar informações sobre disponibilidade, valores e formas de pagamento para este quarto?`;
            }

            // Scroll para fale conosco
            const faleConosco = document.getElementById('fale-conosco');

            if (faleConosco) {
                const headerHeight =
                    document.getElementById('cabecalho')?.offsetHeight || 0;

                const posicao =
                    faleConosco.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight -
                    20;

                window.scrollTo({
                    top: posicao,
                    behavior: 'smooth'
                });
            }

        });

    });

});

function enviarReservaFinal() {

    const checkin = document.getElementById("checkin-final").value;
    const checkout = document.getElementById("checkout-final").value;
    const adultos = document.getElementById("adultos-final").value;
    const criancas = document.getElementById("criancas-final").value;
    const pet = document.getElementById("pet-final").value;

    /* =========================
        VALIDAÇÕES
    ========================== */
    if (!checkin || !checkout) {
        alert("Preencha as datas da hospedagem.");
        return;
    }

    if (checkout < checkin) {
        alert("A data de check-out não pode ser menor que o check-in.");
        return;
    }

    if (adultos <= 0) {
        alert("Informe pelo menos 1 adulto.");
        return;
    }

    /* =========================
        MENSAGEM PROFISSIONAL
    ========================== */
    const mensagem =
        "✨ *Nova Solicitação de Reserva* ✨%0A%0A" +

        "Olá! Tudo bem? Gostaria de consultar disponibilidade para hospedagem.%0A%0A" +

        "📅 *Período da Hóspedes*%0A" +
        "➤ Check-in: " + checkin + "%0A" +
        "➤ Check-out: " + checkout + "%0A%0A" +

        "👥 *Informações dos Hóspedes*%0A" +
        "➤ Adultos: " + adultos + "%0A" +
        "➤ Crianças: " + criancas + "%0A" +
        "➤ Pet pequeno porte: " + pet + "%0A%0A" +

        "💎 *Gostaria de receber informações sobre:*%0A" +
        "➤ Disponibilidade%0A" +
        "➤ Valores das diárias%0A" +
        "➤ Formas de pagamento%0A%0A"
    /* =========================
        NÚMERO WHATSAPP
    ========================== */
    const numero = "557399728505";
    /* =========================
        LINK WHATSAPP
    ========================== */
    const url =
        `https://api.whatsapp.com/send?phone=${numero}&text=${mensagem}`;

    window.open(url, "_blank");
}

/* =========================
    EFEITO 3D + FUNDO SEGUINDO MOUSE
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    // Apenas desktop
    if (window.innerWidth < 992) return;

    const cards = document.querySelectorAll(".card-avaliacao");

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // posição do brilho
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

            // cálculo inclinação
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = ((centerY - y) / centerY) * 8;

            card.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
        });

    });

});

/* =========================
   MOBILE - ANIMAÇÃO TIPO NOTIFICAÇÕES
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

    // Apenas mobile/tablet
    if (window.innerWidth > 991) return;

    const cards = document.querySelectorAll(".card-avaliacao");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show-card");

                // para manter aparecido
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px"
    });

    cards.forEach((card) => {
        observer.observe(card);
    });

});
