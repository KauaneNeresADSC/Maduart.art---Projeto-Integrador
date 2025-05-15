// Função para exibir as imagens na galeria
function displayImages() {
    const galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = '';  // limpa conteúdo antes de adicionar

    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];

    existingPosts.forEach(post => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('product-item');

        const image = document.createElement('img');
        image.src = post.image;
        image.alt = post.caption;
        image.classList.add('clickable-image');
        imageDiv.appendChild(image);

        const description = document.createElement('p');
        description.textContent = post.caption;
        imageDiv.appendChild(description);

        if (post.link) {
            const link = document.createElement('a');
            link.href = post.link;
            link.textContent = 'Ver no WhatsApp';
            link.target = "_blank";
            imageDiv.appendChild(link);
        }

        galleryContainer.appendChild(imageDiv);
    });
}

// Carregar imagens ao iniciar a página
window.addEventListener('DOMContentLoaded', displayImages);
