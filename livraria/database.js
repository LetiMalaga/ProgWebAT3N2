// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Criação da tabela de livros
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      autor TEXT,
      genero TEXT,
      imagem TEXT,
      quantidade INTEGER
    )
  `);
});

// Inicialização do banco de dados com dados do JSON
const fs = require('fs');
const Livro = require('./models/livro'); // Importação da classe Livro

const livrosJson = JSON.parse(fs.readFileSync('livros.json', 'utf8')).books;

livrosJson.forEach((livro) => {
  Livro.criar({
    titulo: livro.titulo,
    autor: livro.autor,
    genero: livro.genero,
    imagem: livro.imagem,
    quantidade: 1 // Quantidade inicial, pode ser ajustada conforme necessário
  }, (err, livroId) => {
    if (err) {
      console.error('Erro ao adicionar livro inicial:', err.message);
    } else {
      console.log(`Livro '${livro.titulo}' adicionado com ID ${livroId}`);
    }
  });
});

module.exports = db;
