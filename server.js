const express = require('express');
const path = require('path');
const cors = require('cors'); // Para evitar bloqueios de CORS
const app = express();
const port = 3000;

// Habilita CORS para permitir requisições do front-end
app.use(cors());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirname));

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'boas_vindas', 'index.html'));
});

// Definição de outras páginas
const paginas = ['boas_vindas', 'entrar', 'nova_senha', 'cadastro', 'recuperar_senha', 'inserir_codigo', 'home', 'perfil','perfil_criar'];
paginas.forEach(pagina => {
    app.get(`/${pagina}`, (req, res) => {
        res.sendFile(path.join(__dirname, `${pagina}`, `${pagina}.html`));
    });
});

// Nova API para o back-end
app.get('/api/mensagem', (req, res) => {
    res.json({ mensagem: "Integração funcionando corretamente!" });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});

fetch('http://localhost:3000/api/mensagem')
    .then(response => response.json())
    .then(data => console.log(data.mensagem));


    fetch("http://localhost:5000/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        nome: "Maria",
        imagem: "URL-da-imagem",
        descricao: "Meu produto incrível!"
    })
})
.then(response => response.json())
.then(data => console.log("Dados salvos:", data))
.catch(error => console.error("Erro ao salvar:", error));

