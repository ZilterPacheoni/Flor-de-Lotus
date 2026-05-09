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

/* =========================
   GALERIA DE QUARTOS E LIGHTBOX
   ========================= */

// Função para abrir a imagem em ecrã inteiro (Lightbox)
function openLightbox(imgSrc) {
    // Define a imagem do modal igual à imagem que foi clicada
    const lightboxImg = document.getElementById('lightboxImage');
    lightboxImg.src = imgSrc;
    
    // Abre o Modal do Bootstrap
    const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    lightboxModal.show();
}

/* =========================
   RESERVA GLOBAL (SEÇÃO QUARTOS)
   ========================= */

function enviarReservaQuartos() {
    // Pega os valores do novo formulário
    const quarto = document.getElementById("quarto-selecionado").value;
    const checkin = document.getElementById("data-checkin-global").value;
    const checkout = document.getElementById("data-checkout-global").value;

    // Validação básica
    if (!checkin || !checkout) {
        alert("Por favor, selecione as datas de check-in e check-out.");
        return;
    }

    if (checkout <= checkin) {
        alert("A data de check-out deve ser maior que a data de check-in.");
        return;
    }

    // Monta a mensagem para o WhatsApp
    const mensagem = 
        "🛎️ *Nova Solicitação de Reserva* 🛎️%0A%0A" +
        "Olá! Gostaria de consultar a disponibilidade para o seguinte quarto:%0A%0A" +
        "🛏️ *Quarto Escolhido:* " + quarto + "%0A" +
        "📅 *Check-in:* " + checkin + "%0A" +
        "📅 *Check-out:* " + checkout + "%0A%0A" +
        "Poderiam me passar informações sobre valores e formas de pagamento?";

    const numeroWhatsApp = "557399728505"; // Teu número
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagem}`;

    // Abre o WhatsApp numa nova aba
    window.open(url, "_blank");
}

/* =========================
   SINCRONIZAÇÃO E ANIMAÇÃO DAS MINIATURAS (EFEITO DESLIZE)
   ========================= */
document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.quarto-gallery');

    galleries.forEach(gallery => {
        const carouselElement = gallery.querySelector('.carousel');
        const thumbsContainer = gallery.querySelector('.img-thumbs-container');
        const thumbs = thumbsContainer.querySelectorAll('.quarto-img-thumb');
        
        if (!carouselElement || thumbs.length === 0) return;

        const carouselItems = carouselElement.querySelectorAll('.carousel-item img');
        const images = Array.from(carouselItems).map(img => img.src);

        carouselElement.addEventListener('slide.bs.carousel', function (e) {
            const nextIndex = e.to; 
            
            const thumb1Index = (nextIndex + 1) % images.length;
            const thumb2Index = (nextIndex + 2) % images.length;

            // 1. Inicia a animação das duas miniaturas
            thumbs[0].classList.add('animate-thumb-1');
            thumbs[1].classList.add('animate-thumb-2');

            // 2. Espera a animação quase terminar (380ms) para fazer a troca
            setTimeout(() => {
                // Troca os links (src) das imagens
                thumbs[0].src = images[thumb1Index];
                thumbs[1].src = images[thumb2Index];

                // Remove as animações de movimento (para voltarem à grelha original)
                thumbs[0].classList.remove('animate-thumb-1');
                thumbs[1].classList.remove('animate-thumb-2');

                // 3. Adiciona um efeito de "surgimento" suave na nova miniatura que entra
                thumbs[1].classList.add('fade-in-thumb');
                
                // Limpa a animação de surgimento após terminar
                setTimeout(() => {
                    thumbs[1].classList.remove('fade-in-thumb');
                }, 400);

            }, 380);
        });
    });
});

/* =========================
   GSAP SCROLL: ÁREA DE LAZER (CORRIGIDO: CABEÇALHO + ALTURA + LARGURA)
   ========================= */

document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        let mm = gsap.matchMedia();

        // --- DESKTOP ---
        mm.add("(min-width: 992px)", () => {
            
            gsap.set("#lazer-img-1", { xPercent: -50, yPercent: -50, x: -380, rotation: -4, width: "340px", height: "480px" });
            gsap.set("#lazer-img-2", { xPercent: -50, yPercent: -50, x: 0, rotation: 0, width: "340px", height: "480px" });
            gsap.set("#lazer-img-3", { xPercent: -50, yPercent: -50, x: 380, rotation: 4, width: "340px", height: "480px" });
            
            gsap.set(".lazer-text-item", { yPercent: -50, autoAlpha: 0, x: 50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".lazer-scroll-container",
                    start: "top -6% px",
                    end: "+=8000", 
                    scrub: 1,      
                    pin: true,     
                }
            });

            // Fase 1: Sinuca abre (Aumentamos a ALTURA para 65vh)
            tl.to("#lazer-img-1", { x: "-25vw", width: "45vw", height: "65vh", rotation: 0, duration: 2 }, "fase1")
              .to(["#lazer-img-2", "#lazer-img-3"], { autoAlpha: 0, duration: 2 }, "fase1")
              .to("#lazer-text-1", { autoAlpha: 1, x: 0, duration: 2 }, "fase1")
              .to({}, {duration: 1.5}); 

            // Retorno Fase 1
            tl.to("#lazer-img-1", { x: -380, width: "340px", height: "480px", rotation: -4, duration: 2 }, "fase1_r")
              .to(["#lazer-img-2", "#lazer-img-3"], { autoAlpha: 1, duration: 2 }, "fase1_r")
              .to("#lazer-text-1", { autoAlpha: 0, x: -50, duration: 2 }, "fase1_r");

            // Fase 2: Churrasqueira
            tl.to("#lazer-img-2", { x: "-25vw", width: "45vw", height: "65vh", duration: 2 }, "fase2")
              .to(["#lazer-img-1", "#lazer-img-3"], { autoAlpha: 0, duration: 2 }, "fase2")
              .to("#lazer-text-2", { autoAlpha: 1, x: 0, duration: 2 }, "fase2")
              .to({}, {duration: 1.5}); 

            // Retorno Fase 2
            tl.to("#lazer-img-2", { x: 0, width: "340px", height: "480px", duration: 2 }, "fase2_r")
              .to(["#lazer-img-1", "#lazer-img-3"], { autoAlpha: 1, duration: 2 }, "fase2_r")
              .to("#lazer-text-2", { autoAlpha: 0, x: -50, duration: 2 }, "fase2_r");

            // Fase 3: Piscina
            tl.to("#lazer-img-3", { x: "-25vw", width: "45vw", height: "65vh", rotation: 0, duration: 2 }, "fase3")
              .to(["#lazer-img-1", "#lazer-img-2"], { autoAlpha: 0, duration: 2 }, "fase3")
              .to("#lazer-text-3", { autoAlpha: 1, x: 0, duration: 2 }, "fase3")
              .to({}, {duration: 1.5}); 
        });

        // --- MOBILE / TABLET ---
        mm.add("(max-width: 991px)", () => {
            
            gsap.set("#lazer-img-1", { xPercent: -50, yPercent: -50, x: -40, rotation: -6, width: "280px", height: "380px" });
            gsap.set("#lazer-img-2", { xPercent: -50, yPercent: -50, x: 0, rotation: 0, width: "280px", height: "380px" });
            gsap.set("#lazer-img-3", { xPercent: -50, yPercent: -50, x: 40, rotation: 6, width: "280px", height: "380px" });
            
            gsap.set(".lazer-text-item", { yPercent: -50, autoAlpha: 0, y: 30, x: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".lazer-scroll-container",
                    start: "top 80px", // CORREÇÃO: Menu mobile
                    end: "+=6000", 
                    scrub: 1,
                    pin: true,
                }
            });

            // Fase 1
            tl.to("#lazer-img-1", { y: "-22vh", width: "90vw", height: "45vh", rotation: 0, zIndex: 10, duration: 2 }, "fase1_m")
              .to(["#lazer-img-2", "#lazer-img-3"], { autoAlpha: 0, duration: 2 }, "fase1_m")
              .to("#lazer-text-1", { autoAlpha: 1, y: 0, duration: 2 }, "fase1_m")
              .to({}, {duration: 1.5}); 

            // Retorno 1
            tl.to("#lazer-img-1", { y: 0, width: "280px", height: "380px", rotation: -6, zIndex: 1, duration: 2 }, "retorno1_m")
              .to(["#lazer-img-2", "#lazer-img-3"], { autoAlpha: 1, duration: 2 }, "retorno1_m")
              .to("#lazer-text-1", { autoAlpha: 0, y: -30, duration: 2 }, "retorno1_m");

            // Fase 2
            tl.to("#lazer-img-2", { y: "-22vh", width: "90vw", height: "45vh", zIndex: 10, duration: 2 }, "fase2_m")
              .to(["#lazer-img-1", "#lazer-img-3"], { autoAlpha: 0, duration: 2 }, "fase2_m")
              .to("#lazer-text-2", { autoAlpha: 1, y: 0, duration: 2 }, "fase2_m")
              .to({}, {duration: 1.5}); 

            // Retorno 2
            tl.to("#lazer-img-2", { y: 0, width: "280px", height: "380px", zIndex: 1, duration: 2 }, "retorno2_m")
              .to(["#lazer-img-1", "#lazer-img-3"], { autoAlpha: 1, duration: 2 }, "retorno2_m")
              .to("#lazer-text-2", { autoAlpha: 0, y: -30, duration: 2 }, "retorno2_m");

            // Fase 3
            tl.to("#lazer-img-3", { y: "-22vh", width: "90vw", height: "45vh", rotation: 0, zIndex: 10, duration: 2 }, "fase3_m")
              .to(["#lazer-img-1", "#lazer-img-2"], { autoAlpha: 0, duration: 2 }, "fase3_m")
              .to("#lazer-text-3", { autoAlpha: 1, y: 0, duration: 2 }, "fase3_m")
              .to({}, {duration: 1.5}); 
        });
    }
});