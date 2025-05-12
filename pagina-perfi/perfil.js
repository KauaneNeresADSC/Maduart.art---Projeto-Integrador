// Função para abrir o modal de configurações
document.getElementById('settingsButton').addEventListener('click', function() {
    document.getElementById('settingsModal').style.display = 'block';
});

// Função para salvar as configurações de perfil (imagem e nome)
function saveProfileSettings() {
    const profilePicInput = document.getElementById('profilePicInput');
    const profileImage = document.getElementById('profileImage');
    const settingsUsername = document.getElementById('settingsUsername');

    // Salvar imagem de perfil
    if (profilePicInput.files && profilePicInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result; // Atualiza a imagem de perfil
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    }

    // Salvar nome de usuário
    const newUsername = settingsUsername.value.trim();
    if (newUsername) {
        document.getElementById('displayUsername').textContent = newUsername; // Atualiza o nome de usuário
    }

    // Fechar o modal após salvar
    document.getElementById('settingsModal').style.display = 'none';
}

// Função para abrir o modal de upload de imagem
document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('uploadModal').style.display = 'block';
});

// Função para visualizar a imagem antes de adicionar ao portfólio
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

// Função para adicionar a imagem ao portfólio
document.getElementById('addImageBtn').addEventListener('click', function() {
    const file = document.getElementById('uploadInput').files[0];
    const caption = document.getElementById('modalCaption').value.trim();
    const whatsappLink = document.getElementById('whatsappLink').value.trim();

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newProduct = document.createElement('div');
            newProduct.classList.add('product-item');
            
            const image = document.createElement('img');
            image.src = e.target.result;
            image.alt = caption;
            image.classList.add('clickable-image');
            newProduct.appendChild(image);

            const description = document.createElement('p');
            description.textContent = caption;
            newProduct.appendChild(description);

            if (whatsappLink) {
                const link = document.createElement('a');
                link.href = whatsappLink;
                link.textContent = 'Ver no WhatsApp';
                newProduct.appendChild(link);
            }

            document.getElementById('productList').appendChild(newProduct);
        };
        reader.readAsDataURL(file);
    }

    // Fechar o modal após adicionar
    document.getElementById('uploadModal').style.display = 'none';
});

// Função para visualizar a imagem com a legenda e o link do WhatsApp
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('clickable-image')) {
        const imageSrc = e.target.src;
        const caption = e.target.alt;
        const link = e.target.nextElementSibling ? e.target.nextElementSibling.href : null;

        // Exibir a imagem no modal
        document.getElementById('modalImage').src = imageSrc;
        document.getElementById('modalCaptionText').textContent = caption;
        const modalLink = document.getElementById('modalLink');
        if (link) {
            modalLink.style.display = 'block';
            modalLink.href = link;
        } else {
            modalLink.style.display = 'none';
        }

        // Exibir o modal de imagem
        document.getElementById('imageModal').style.display = 'block';
    }
});

// Fechar o modal de imagem
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
