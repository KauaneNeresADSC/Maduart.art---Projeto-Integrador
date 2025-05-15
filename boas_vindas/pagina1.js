document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o botão "Cadastrar Conta"
    const cadastrarBtn = document.querySelector(".register");

    // Adiciona um evento de clique ao botão
    cadastrarBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        window.location.href = "../pagina4_cadastro/cadastro.html"; // Redireciona para a página desejada
    });
});
