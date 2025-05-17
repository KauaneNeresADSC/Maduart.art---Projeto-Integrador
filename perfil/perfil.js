// Exibir o modal ao clicar na imagem de perfil
document.getElementById("profileImage").addEventListener("click", function () {
  document.getElementById("uploadModal").style.display = "block";
});

// Exibir o modal ao clicar em qualquer célula da galeria
document.querySelectorAll(".photo-cell").forEach(cell => {
  cell.addEventListener("click", function () {
    document.getElementById("uploadModal").style.display = "block";
  });
});

// Adicionar imagem ao perfil e salvar no localStorage
document.getElementById("addImageBtn").addEventListener("click", function () {
  const file = document.getElementById("uploadInput").files[0];
  const caption = document.getElementById("modalCaption").value.trim();
  const whatsappLink = document.getElementById("whatsappLink").value.trim();

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const post = {
        image: e.target.result,
        caption: caption,
        link: whatsappLink
      };

      // Adicionar imagem na próxima célula disponível da galeria
      const profileGallery = document.querySelector(".photo-table");
      const cells = profileGallery.querySelectorAll(".photo-cell");

      for (let i = 0; i < cells.length; i++) {
        if (!cells[i].style.backgroundImage) {
          cells[i].style.backgroundImage = `url('${post.image}')`;
          cells[i].style.backgroundSize = "cover";
          cells[i].style.backgroundPosition = "center";
          cells[i].querySelector(".photo-text").style.display = "none";
          break;
        }
      }

      // Salvar no localStorage para aparecer na home
      const existingPosts = JSON.parse(localStorage.getItem("profileImages")) || [];
      existingPosts.unshift(post);
      localStorage.setItem("profileImages", JSON.stringify(existingPosts));

      // Fechar o modal
      document.getElementById("uploadModal").style.display = "none";

      // Limpar os campos do modal
      document.getElementById("uploadInput").value = "";
      document.getElementById("modalCaption").value = "";
      document.getElementById("whatsappLink").value = "";
    };
    reader.readAsDataURL(file);
  }
});

// Carregar imagens do perfil salvas no localStorage
window.addEventListener("DOMContentLoaded", function () {
  const profileGallery = document.querySelector(".photo-table");
  const images = JSON.parse(localStorage.getItem("profileImages")) || [];
  const cells = profileGallery.querySelectorAll(".photo-cell");

  images.forEach((post, index) => {
    if (index < cells.length) {
      cells[index].style.backgroundImage = `url('${post.image}')`;
      cells[index].style.backgroundSize = "cover";
      cells[index].style.backgroundPosition = "center";
      cells[index].querySelector(".photo-text").style.display = "none";
    }
  });

  // Atualizar página home com imagens do perfil
  const postsGrid = document.getElementById("postsGrid");
  if (postsGrid) {
    postsGrid.innerHTML = "";
    images.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.className = "space-y-1";

      const img = document.createElement("img");
      img.className = "w-full object-cover rounded-lg shadow-md";
      img.src = post.image;
      img.alt = post.caption;
      img.width = 150;
      img.height = 150;

      postDiv.appendChild(img);
      postsGrid.appendChild(postDiv);
    });
  }

  // Carregar redes sociais salvas
  document.getElementById("facebookLink").value = localStorage.getItem("facebookLink") || "";
  document.getElementById("instagramLink").value = localStorage.getItem("instagramLink") || "";
  document.getElementById("cellNumber").value = localStorage.getItem("cellNumber") || "";

  // Carregar nome de usuário salvo
  const savedUsername = localStorage.getItem("profileUsername");
  if (savedUsername) {
    document.getElementById("displayUsername").textContent = savedUsername;
  }
});

// Fechar o modal ao clicar fora dele
window.onclick = function (event) {
  if (event.target === document.getElementById("uploadModal")) {
    document.getElementById("uploadModal").style.display = "none";
  }
};

// Permitir edição do nome de usuário
document.getElementById("displayUsername").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const newUsername = this.textContent.trim();
    if (newUsername) {
      localStorage.setItem("profileUsername", newUsername);
      this.blur();
    }
  }
});

// Restaurar nome de usuário padrão se apagado
document.getElementById("displayUsername").addEventListener("blur", function () {
  if (this.textContent.trim() === "") {
    this.textContent = "Nome do Usuário";
    localStorage.setItem("profileUsername", "Nome do Usuário");
  }
});

// Permitir atualização de redes sociais
document.getElementById("saveSocialLinks").addEventListener("click", function () {
  const facebookLink = document.getElementById("facebookLink").value.trim();
  const instagramLink = document.getElementById("instagramLink").value.trim();
  const cellNumber = document.getElementById("cellNumber").value.trim();

  localStorage.setItem("facebookLink", facebookLink);
  localStorage.setItem("instagramLink", instagramLink);
  localStorage.setItem("cellNumber", cellNumber);
});

// Referência ao campo de entrada de arquivo oculto
const hiddenFileInput = document.getElementById("hiddenFileInput");

// Variável para armazenar o elemento clicado
let clickedElement = null;

// Função para lidar com o clique na imagem de perfil
document.getElementById("profileImage").addEventListener("click", function () {
    clickedElement = this;
    hiddenFileInput.click();
});

// Função para lidar com o clique nas células da galeria
document.querySelectorAll(".photo-cell").forEach(cell => {
    cell.addEventListener("click", function () {
        clickedElement = this;
        hiddenFileInput.click();
    });
});

// Função para lidar com a seleção de um arquivo
hiddenFileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file && clickedElement) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;

            if (clickedElement.id === "profileImage") {
                // Atualiza a imagem de perfil
                clickedElement.src = imageData;
                localStorage.setItem("profileImage", imageData);
            } else if (clickedElement.classList.contains("photo-cell")) {
                // Atualiza a célula da galeria
                clickedElement.style.backgroundImage = `url('${imageData}')`;
                clickedElement.style.backgroundSize = "cover";
                clickedElement.style.backgroundPosition = "center";
                const textSpan = clickedElement.querySelector(".photo-text");
                if (textSpan) textSpan.style.display = "none";

                // Salva no localStorage
                const existingPosts = JSON.parse(localStorage.getItem("profileImages")) || [];
                existingPosts.unshift({ image: imageData });
                localStorage.setItem("profileImages", JSON.stringify(existingPosts));
            }

            // Limpa a seleção do arquivo
            hiddenFileInput.value = "";
            clickedElement = null;
        };
        reader.readAsDataURL(file);
    }
});

// Carrega a imagem de perfil salva no localStorage
window.addEventListener("DOMContentLoaded", function () {
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
        document.getElementById("profileImage").src = savedProfileImage;
    }

    // Carrega as imagens da galeria salvas no localStorage
    const profileGallery = document.querySelector(".photo-table");
    const images = JSON.parse(localStorage.getItem("profileImages")) || [];
    const cells = profileGallery.querySelectorAll(".photo-cell");

    images.forEach((post, index) => {
        if (index < cells.length) {
            cells[index].style.backgroundImage = `url('${post.image}')`;
            cells[index].style.backgroundSize = "cover";
            cells[index].style.backgroundPosition = "center";
            const textSpan = cells[index].querySelector(".photo-text");
            if (textSpan) textSpan.style.display = "none";
        }
    });
});


