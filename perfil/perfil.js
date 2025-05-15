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

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".photo-cell").forEach((cell, index) => {
        // Carregar imagem salva no LocalStorage
        const savedImage = localStorage.getItem(`photo-${index}`);
        if (savedImage) {
            cell.style.backgroundImage = `url('${savedImage}')`;
            cell.style.backgroundSize = "cover";
            cell.style.backgroundPosition = "center";
        }

        // Adicionar evento de clique para trocar imagem
        cell.addEventListener("click", function () {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";

            fileInput.addEventListener("change", function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        // Salvar imagem no LocalStorage
                        localStorage.setItem(`photo-${index}`, e.target.result);
                        cell.style.backgroundImage = `url('${e.target.result}')`;
                        cell.style.backgroundSize = "cover";
                        cell.style.backgroundPosition = "center";
                    };
                    reader.readAsDataURL(file);
                }
            });

            fileInput.click();
        });
    });
});


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

        // Adicionar evento de clique para trocar imagem
        cell.addEventListener("click", function () {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";

            fileInput.addEventListener("change", function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        // Salvar imagem no LocalStorage
                        localStorage.setItem(`photo-${index}`, e.target.result);
                        cell.style.backgroundImage = `url('${e.target.result}')`;
                        cell.style.backgroundSize = "cover";
                        cell.style.backgroundPosition = "center";
                        textElement.style.display = "none"; // Esconde o texto ao adicionar imagem
                    };
                    reader.readAsDataURL(file);
                }
            });

            fileInput.click();
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const profileHint = document.getElementById("profileHint");

    // Carregar imagem salva no LocalStorage
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
        profileImage.src = savedProfileImage;
        profileHint.style.display = "none"; // Esconde o hint se já houver uma imagem
    }

    // Clique para trocar a imagem
    profileImage.addEventListener("click", function () {
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
                    profileHint.style.display = "none"; // Esconde o texto ao adicionar imagem
                };
                reader.readAsDataURL(file);
            }
        });

        fileInput.click();
    });
});

