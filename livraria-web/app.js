const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const livrosRouter = require('./routes/livros');

const app = express();
const PORTA = process.env.PORT || 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do SQLite
const dbDir = path.resolve(__dirname, 'db');
const dbPath = path.join(dbDir, 'livros.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conexão estabelecida com o banco de dados SQLite');
    }
});

// Configuração das rotas
app.use('/api/livros', livrosRouter);

// Configuração do EJS para renderização de páginas HTML
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Página inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciar o servidor
app.listen(PORTA, () => {
    console.log(`Servidor está rodando na porta ${PORTA}`);
});
