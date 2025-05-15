document.addEventListener("DOMContentLoaded", function () {
    const cadastroForm = document.getElementById("cadastro-form");

    cadastroForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                alert("Conta criada com sucesso!");
                console.log("Usuário cadastrado:", userCredential.user);

                // Aguarda a autenticação antes de redirecionar
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        window.location.href = "../pagina_perfil/perfil.html"; // Certifique-se de que o caminho está correto
                    }
                });
            })
            .catch((error) => {
                alert("Erro ao cadastrar: " + error.message);
            });
    });
});
