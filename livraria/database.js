const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('banco.db');

// Criação da tabela de livros
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      autor TEXT,
      genero TEXT,
      imagem TEXT,
      exemplares INTEGER
    )
  `);
});

// Função para inserir um livro no banco de dados
const criarLivro = (livro, callback) => {
  const { titulo, autor, genero, imagem, exemplares } = livro;
  db.run(
    'INSERT INTO livros (titulo, autor, genero, imagem, exemplares) VALUES (?, ?, ?, ?, ?)',
    [titulo, autor, genero, imagem, exemplares],
    function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, this.lastID); // Retorna o ID do novo livro
      }
    }
  );
};

// Função para contar os livros
const contarLivros = (callback) => {
  db.get('SELECT COUNT(*) AS total FROM livros', (err, row) => {
    if (err) {
      callback(err);
    } else {
      callback(null, row.total);
    }
  });
};

module.exports = {
  db,
  criarLivro,
  contarLivros
};
