// Abrir modal de configurações
document.getElementById('settingsButton').addEventListener('click', function() {
    document.getElementById('settingsModal').style.display = 'block';
});

// Salvar configurações de perfil
function saveProfileSettings() {
    const profilePicInput = document.getElementById('profilePicInput');
    const profileImage = document.getElementById('profileImage');
    const settingsUsername = document.getElementById('settingsUsername');

    // Salvar imagem de perfil
    if (profilePicInput.files && profilePicInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
            localStorage.setItem('profileImage', e.target.result); // salva imagem no localStorage
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    }

    // Salvar nome de usuário
    const newUsername = settingsUsername.value.trim();
    if (newUsername) {
        document.getElementById('displayUsername').textContent = newUsername;
        localStorage.setItem('profileUsername', newUsername); // salva nome no localStorage
    }

    // Fechar modal
    document.getElementById('settingsModal').style.display = 'none';
}

// Carregar configurações salvas
window.addEventListener('DOMContentLoaded', () => {
    const savedImage = localStorage.getItem('profileImage');
    const savedUsername = localStorage.getItem('profileUsername');

    if (savedImage) {
        document.getElementById('profileImage').src = savedImage;
    }
    if (savedUsername) {
        document.getElementById('displayUsername').textContent = savedUsername;
    }
});

// Abrir modal de upload
document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('uploadModal').style.display = 'block';
});

// Visualizar imagem antes de adicionar
document.getElementById('uploadInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImage = document.getElementById('modalPreview');
            previewImage.style.display = 'block';
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Adicionar imagem ao portfólio e salvar no localStorage
document.getElementById('addImageBtn').addEventListener('click', function() {
    const file = document.getElementById('uploadInput').files[0];
    const caption = document.getElementById('modalCaption').value.trim();
    const whatsappLink = document.getElementById('whatsappLink').value.trim();

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const post = {
                image: e.target.result,
                caption: caption,
                link: whatsappLink
            };

            // Adiciona visualmente no perfil
            const newProduct = document.createElement('div');
            newProduct.classList.add('product-item');

            const image = document.createElement('img');
            image.src = post.image;
            image.alt = post.caption;
            image.classList.add('clickable-image');
            newProduct.appendChild(image);

            const description = document.createElement('p');
            description.textContent = post.caption;
            newProduct.appendChild(description);

            if (post.link) {
                const link = document.createElement('a');
                link.href = post.link;
                link.textContent = 'Ver no WhatsApp';
                newProduct.appendChild(link);
            }

            document.getElementById('productList').appendChild(newProduct);

            // Salva no LocalStorage para aparecer na home
            const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
            existingPosts.unshift(post);
            localStorage.setItem('posts', JSON.stringify(existingPosts));

            // Fecha o modal
            document.getElementById('uploadModal').style.display = 'none';

            // Limpa campos
            document.getElementById('uploadInput').value = '';
            document.getElementById('modalCaption').value = '';
            document.getElementById('whatsappLink').value = '';
            document.getElementById('modalPreview').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Visualizar imagem ampliada
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('clickable-image')) {
        const imageSrc = e.target.src;
        const caption = e.target.alt;
        const link = e.target.nextElementSibling?.href || null;

        document.getElementById('modalImage').src = imageSrc;
        document.getElementById('modalCaptionText').textContent = caption;
        const modalLink = document.getElementById('modalLink');

        if (link) {
            modalLink.style.display = 'block';
            modalLink.href = link;
        } else {
            modalLink.style.display = 'none';
        }

        document.getElementById('imageModal').style.display = 'block';
    }
});

// Fechar modal de imagem
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('imageModal').style.display = 'none';
});

// Fechar modais ao clicar fora
window.onclick = function(event) {
    if (event.target === document.getElementById('settingsModal')) {
        document.getElementById('settingsModal').style.display = 'none';
    }
    if (event.target === document.getElementById('uploadModal')) {
        document.getElementById('uploadModal').style.display = 'none';
    }
    if (event.target === document.getElementById('imageModal')) {
        document.getElementById('imageModal').style.display = 'none';
    }
};




// Adiciona o nome do usuario, salva e caso seja apagado volte ao padrao "nome de usuario"
document.addEventListener("DOMContentLoaded", function () {
    const displayUsername = document.getElementById("displayUsername");

    // Carregar nome salvo no LocalStorage
    const savedUsername = localStorage.getItem("profileUsername");
    if (savedUsername) {
        displayUsername.textContent = savedUsername;
    }

    // Habilita edição ao clicar
    displayUsername.addEventListener("click", function () {
        displayUsername.focus();
    });

    // Salva o nome ao pressionar Enter
    displayUsername.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const newUsername = displayUsername.textContent.trim();
            if (newUsername) {
                localStorage.setItem("profileUsername", newUsername);
                displayUsername.blur();
            }
        }
    });

    // Verifica se o nome foi apagado e restaura o texto padrão
    displayUsername.addEventListener("blur", function () {
        if (displayUsername.textContent.trim() === "") {
            displayUsername.textContent = "Nome do Usuário";
            localStorage.setItem("profileUsername", "Nome do Usuário");
        }
    });
});


// Adiciona imagens dentro dos quadrados
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".photo-cell").forEach((cell, index) => {
        const textElement = cell.querySelector(".photo-text");

        // Carregar imagem salva no LocalStorage
        const savedImage = localStorage.getItem(`photo-${index}`);
        if (savedImage) {
            cell.style.backgroundImage = `url('${savedImage}')`;
            cell.style.backgroundSize = "cover";
            cell.style.backgroundPosition = "center";
            textElement.style.display = "none"; // Esconde o texto ao carregar imagem
        }

        // Adicionar evento de clique para cada quadrado
        cell.addEventListener("click", function () {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";

            fileInput.addEventListener("change", function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        // Aplica a imagem imediatamente no quadrado clicado
                        cell.style.backgroundImage = `url('${e.target.result}')`;
                        cell.style.backgroundSize = "cover";
                        cell.style.backgroundPosition = "center";

                        // Esconde o texto imediatamente após a imagem ser aplicada
                        textElement.style.display = "none";

                        // Salva no LocalStorage para persistência
                        localStorage.setItem(`photo-${index}`, e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });

            fileInput.click();
        });
    });
});

// Adiciona imagem dentro do circulo de profileImage
document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");

    if (profileImage) {
        profileImage.addEventListener("click", function () {
            console.log("Imagem clicada!"); // Apenas para teste
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";

            fileInput.addEventListener("change", function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        profileImage.src = e.target.result;
                        localStorage.setItem("profileImage", e.target.result);
                        document.getElementById("profileHint").style.display = "none"; // Esconde o texto ao adicionar imagem
                    };
                    reader.readAsDataURL(file);
                }
            });

            fileInput.click();
        });
    } else {
        console.error("Elemento profileImage não encontrado!");
    }
});

// Limpar todos os dados armazenados no localStorage quando carregar a pagina novamente
window.addEventListener("DOMContentLoaded", () => {
    // Limpar todos os dados armazenados no localStorage
    localStorage.clear();

    // Restaurar imagem de perfil para a padrão
    document.getElementById("profileImage").src = "default-profile.jpg";

    // Restaurar nome de usuário
    document.getElementById("displayUsername").textContent = "Nome do Usuário";

    // Restaurar fotos do portfólio
    document.querySelectorAll(".photo-cell").forEach((cell) => {
        cell.style.backgroundImage = "none"; // Remove imagem
        const textElement = cell.querySelector(".photo-text");
        textElement.style.display = "block"; // Exibe o texto padrão
    });

    // Restaurar os campos de redes sociais
    document.getElementById("facebookLink").value = "";
    document.getElementById("instagramLink").value = "";
    document.getElementById("cellNumber").value = "";
});

document.getElementById("saveSocialLinks").addEventListener("click", function () {
    // Captura os inputs
    const facebookLink = document.getElementById("facebookLink");
    const instagramLink = document.getElementById("instagramLink");
    const cellNumber = document.getElementById("cellNumber");

    // Salva os valores no localStorage
    localStorage.setItem("facebookLink", facebookLink.value);
    localStorage.setItem("instagramLink", instagramLink.value);
    localStorage.setItem("cellNumber", cellNumber.value);

    // Desativa os inputs para exibição fixa
    facebookLink.disabled = true;
    instagramLink.disabled = true;
    cellNumber.disabled = true;

    // Esconde o botão após o salvamento
    document.getElementById("saveSocialLinks").style.display = "none";
});

// Permitir edição ao clicar nos inputs
document.querySelectorAll("#facebookLink, #instagramLink, #cellNumber").forEach(input => {
    input.addEventListener("click", function () {
        // Reativa os inputs para edição
        this.disabled = false;

        // Mostrar botão "Salvar" novamente
        document.getElementById("saveSocialLinks").style.display = "block";
    });
});

// Carrega os dados salvos ao iniciar a página
window.addEventListener("DOMContentLoaded", function () {
    const savedFacebook = localStorage.getItem("facebookLink");
    const savedInstagram = localStorage.getItem("instagramLink");
    const savedCellNumber = localStorage.getItem("cellNumber");

    // Preenche os campos se houver dados salvos
    if (savedFacebook) document.getElementById("facebookLink").value = savedFacebook;
    if (savedInstagram) document.getElementById("instagramLink").value = savedInstagram;
    if (savedCellNumber) document.getElementById("cellNumber").value = savedCellNumber;

    // Se já houver valores salvos, desativa os inputs e esconde o botão
    if (savedFacebook || savedInstagram || savedCellNumber) {
        document.getElementById("facebookLink").disabled = true;
        document.getElementById("instagramLink").disabled = true;
        document.getElementById("cellNumber").disabled = true;
        document.getElementById("saveSocialLinks").style.display = "none";
    }
});

document.getElementById("saveSocialLinks").addEventListener("click", function () {
    const facebookLink = document.getElementById("facebookLink").value.trim();
    const instagramLink = document.getElementById("instagramLink").value.trim();
    const cellNumber = document.getElementById("cellNumber").value.trim();

    // Salva os valores no localStorage
    localStorage.setItem("facebookLink", facebookLink);
    localStorage.setItem("instagramLink", instagramLink);
    localStorage.setItem("cellNumber", cellNumber);

    // Substituir inputs por links clicáveis
    if (facebookLink) {
        document.getElementById("facebookLink").outerHTML = `<a href="${facebookLink}" target="_blank">Facebook</a>`;
    }
    if (instagramLink) {
        document.getElementById("instagramLink").outerHTML = `<a href="${instagramLink}" target="_blank">Instagram</a>`;
    }
    if (cellNumber) {
        document.getElementById("cellNumber").disabled = true; // Apenas desativa, já que não é um link
    }

    // Esconde o botão após o salvamento
    document.getElementById("saveSocialLinks").style.display = "none";
});
