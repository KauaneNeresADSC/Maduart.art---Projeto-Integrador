document.addEventListener("DOMContentLoaded", function () {
    // Referências aos elementos
    const uploadButton = document.getElementById("uploadButton");
    const uploadInput = document.getElementById("uploadInput");
    const profilePicContainer = document.getElementById("profilePicContainer");
    const profileImage = document.getElementById("profileImage");
    const cadastrarButton = document.getElementById("Cadastrar");
    const displayUsername = document.getElementById("displayUsername");
    const facebookLink = document.getElementById("facebookLink");
    const instagramLink = document.getElementById("instagramLink");
    const cellNumber = document.getElementById("cellNumber");
    const aboutText = document.getElementById("aboutText");
    const photoCells = document.querySelectorAll(".photo-cell");

    // Atualizar imagem de perfil ao clicar na bolinha
    profilePicContainer.addEventListener("click", function () {
        const profileInput = document.createElement("input");
        profileInput.type = "file";
        profileInput.accept = "image/*";
        profileInput.style.display = "none";
        document.body.appendChild(profileInput);
        profileInput.click();

        profileInput.addEventListener("change", function () {
            const file = profileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profileImage.src = e.target.result;
                    localStorage.setItem("profileImage", e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Exibir seletor de arquivo ao clicar no botão "Adicionar Fotos"
    uploadButton.addEventListener("click", function () {
        uploadInput.click();
    });

    uploadInput.addEventListener("change", function () {
        const file = uploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newImage = { image: e.target.result };

                // Encontrar a primeira célula vazia e adicionar a imagem
                const emptyCell = Array.from(photoCells).find(cell => !cell.style.backgroundImage);
                if (emptyCell) {
                    emptyCell.style.backgroundImage = `url('${newImage.image}')`;
                    emptyCell.style.backgroundSize = "cover";
                    emptyCell.style.backgroundPosition = "center";
                    emptyCell.querySelector(".photo-text").style.display = "none"; // Esconder texto

                    // Salvar no localStorage
                    const existingImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
                    existingImages.push(newImage);
                    localStorage.setItem("galleryImages", JSON.stringify(existingImages));
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Restaurar imagens na galeria ao carregar a página
    function updateGallery() {
        const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
        photoCells.forEach((cell, index) => {
            if (savedImages[index]) {
                cell.style.backgroundImage = `url('${savedImages[index].image}')`;
                cell.style.backgroundSize = "cover";
                cell.style.backgroundPosition = "center";
                cell.querySelector(".photo-text").style.display = "none"; // Esconder texto ao restaurar imagens
            }
        });
    }

    updateGallery();

    // Salvar todas as informações ao clicar no botão "Cadastrar" e redirecionar para perfil/perfil.html
    cadastrarButton.addEventListener("click", function () {
        localStorage.setItem("displayUsername", displayUsername.textContent.trim());
        localStorage.setItem("facebookLink", facebookLink.value.trim());
        localStorage.setItem("instagramLink", instagramLink.value.trim());
        localStorage.setItem("cellNumber", cellNumber.value.trim());
        localStorage.setItem("aboutText", aboutText.value.trim());

        alert("Informações salvas com sucesso!");
        window.location.href = "../perfil/perfil.html;"// Agora direciona corretamente
    });

    // Restaurar informações ao carregar a página
    displayUsername.textContent = localStorage.getItem("displayUsername") || "Seu Nome";
    facebookLink.value = localStorage.getItem("facebookLink") || "";
    instagramLink.value = localStorage.getItem("instagramLink") || "";
    cellNumber.value = localStorage.getItem("cellNumber") || "";
    aboutText.value = localStorage.getItem("aboutText") || "";
    profileImage.src = localStorage.getItem("profileImage") || "";
});
