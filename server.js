const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir todos os arquivos da pasta principal
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'boas_vindas', 'index.html'));
});

// Outras rotas para acessar diferentes páginas (adicione conforme necessário)
app.get('/boas_vindas', (req, res) => {
    res.sendFile(path.join(__dirname, 'boas_vindas', 'index.html'));
});
app.get('/entrar', (req, res) => {
    res.sendFile(path.join(__dirname, 'entrar', 'index.html'));
});

app.get('/nova_senha', (req, res) => {
    res.sendFile(path.join(__dirname, 'nova_senha', 'index.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'cadastro', 'cadastro.html'));
});

app.get('/recuperar_senha', (req, res) => {
    res.sendFile(path.join(__dirname, 'recuperar_Senha', 'recuperar.html'));
});

app.get('/inserir_codigo', (req, res) => {
    res.sendFile(path.join(__dirname, 'inserir_codigo', 'codigo.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home', 'home.html'));
});

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'perfil', 'perfil.html'));
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
