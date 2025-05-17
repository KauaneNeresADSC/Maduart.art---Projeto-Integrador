document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const profileUsername = localStorage.getItem("profileUsername") || "Usuário Desconhecido";
    const images = JSON.parse(localStorage.getItem("userImages")) || [];

    carousel.innerHTML = ""; // Limpa antes de adicionar conteúdo

    if (images.length === 0) {
        carousel.innerHTML = "<p class='text-white text-center'>Nenhuma imagem encontrada.</p>";
    } else {
        images.forEach(imageSrc => {
            if (imageSrc) { // Evita imagens vazias
                const slideDiv = document.createElement("div");
                slideDiv.className = "carousel-slide";

                const usernameLabel = document.createElement("p");
                usernameLabel.className = "post-username";
                usernameLabel.textContent = profileUsername;
                slideDiv.appendChild(usernameLabel);

                const img = document.createElement("img");
                img.className = "post-img";
                img.src = imageSrc;
                img.alt = "Publicação";
                slideDiv.appendChild(img);

                carousel.appendChild(slideDiv);
            }
        });
    }

    // Carrossel - Navegação
    let index = 0;
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function updateCarousel() {
        const slideWidth = document.querySelector(".carousel-slide").clientWidth;
        carousel.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    nextBtn.addEventListener("click", function () {
        index = (index + 1) % images.length; // Loop infinito
        updateCarousel();
    });

    prevBtn.addEventListener("click", function () {
        index = (index - 1 + images.length) % images.length; // Voltar para última imagem ao clicar em "Anterior"
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
});
