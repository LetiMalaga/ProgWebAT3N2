// app.js
const express = require('express');
const bodyParser = require('body-parser');
const livrosRouter = require('./routes/livros');
const db = require('./database.js');

const app = express();
const PORT = 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Rota base para operações com livros
app.use('/livros', livrosRouter);

// Inicialização do servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
