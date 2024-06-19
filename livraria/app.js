const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const livrosRouter = require('./routes/livros');
const { db, criarLivro, contarLivros } = require('./database.js'); // Importando db e funções do database

const app = express();
const PORT = 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'views'
app.use(express.static(path.join(__dirname, 'views')));

// Rota base para operações com livros
app.use('/livros', livrosRouter);

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Verifica se o banco de dados está vazio antes de inicializar
contarLivros((err, totalLivros) => {
  if (err) {
    console.error('Erro ao verificar se o banco de dados está vazio:', err);
    return;
  }

  if (totalLivros === 0) {
    console.log('Inicializando banco de dados com dados do JSON...');

    // Inicialização do banco de dados com dados do JSON
    const fs = require('fs');
    const livrosJson = JSON.parse(fs.readFileSync('livros.json', 'utf8')).books;

    livrosJson.forEach((livro) => {
      criarLivro({
        titulo: livro.titulo,
        autor: livro.autor,
        genero: livro.genero,
        imagem: livro.imagem,
        exemplares: livro.exemplares
      }, (err, livroId) => {
        if (err) {
          console.error('Erro ao adicionar livro inicial:', err.message);
        } else {
          console.log(`Livro '${livro.titulo}' adicionado com ID ${livroId}`);
        }
      });
    });
  } else {
    console.log('O banco de dados já contém livros. Não é necessário inicializar com dados do JSON.');
  }
});

// Inicialização do servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
