//Firebase SDK como módulo
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

    // Configuração do seu projeto Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCXp7nqLSFN3UnL-QCGREo_-JClyLosplQ",
      authDomain: "projeto-integrador-f65ec.firebaseapp.com",
      projectId: "projeto-integrador-f65ec",
      storageBucket: "projeto-integrador-f65ec.firebasestorage.app",
      messagingSenderId: "12669885040",
      appId: "1:12669885040:web:bc9ec19edc0bf5511a32b5",
      measurementId: "G-SXG8BE7R1Y"
    };

    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);

    // Cadastro de usuário
    document.getElementById("cadastro-form").addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          alert("Conta criada com sucesso!");
          console.log("Usuário cadastrado:", userCredential.user);
           window.location.href = "../perfil_criar/perfilCriar.html";
        })
        .catch((error) => {
          alert("Erro ao cadastrar: " + error.message);
        });
    });