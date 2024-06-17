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
      ano INTEGER,
      quantidade INTEGER
    )
  `);
});

module.exports = db;

const fs = require('fs');

// Inicializando o Banco de Dados do JSON
const livrosJson = JSON.parse(fs.readFileSync('livros.json', 'utf8'));

livrosJson.forEach((livro) => {
  Livro.criar(livro, (err) => {
    if (err) {
      console.error('Erro ao adicionar livro inicial:', err.message);
    }
  });
});