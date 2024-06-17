// models/livro.js
const db = require('../database');

class Livro {
  // Listar todos os livros
  static listar(callback) {
    db.all('SELECT * FROM livros', callback);
  }

  // Buscar um livro por ID
  static buscarPorId(id, callback) {
    db.get('SELECT * FROM livros WHERE id = ?', [id], callback);
  }

  // Buscar livros pelo título (usando LIKE para busca parcial)
  static buscarPorTitulo(titulo, callback) {
    db.all('SELECT * FROM livros WHERE titulo LIKE ?', [`%${titulo}%`], callback);
  }

  // Criar um novo livro
  static criar(dados, callback) {
    const { titulo, autor, genero, ano, quantidade } = dados;
    db.run(
      'INSERT INTO livros (titulo, autor, genero, ano, quantidade) VALUES (?, ?, ?, ?, ?)',
      [titulo, autor, genero, ano, quantidade],
      function (err) {
        callback(err, this.lastID); // Retorna o ID do novo livro
      }
    );
  }

  // Atualizar as informações de um livro existente
  static atualizar(id, dados, callback) {
    const { titulo, autor, genero, ano, quantidade } = dados;
    db.run(
      'UPDATE livros SET titulo = ?, autor = ?, genero = ?, ano = ?, quantidade = ? WHERE id = ?',
      [titulo, autor, genero, ano, quantidade, id],
      callback
    );
  }

  // Remover um livro do acervo
  static remover(id, callback) {
    db.run('DELETE FROM livros WHERE id = ?', [id], callback);
  }

  // Comprar um livro (diminuir a quantidade)
  static comprar(id, quantidade, callback) {
    db.run('UPDATE livros SET quantidade = quantidade - ? WHERE id = ?', [quantidade, id], callback);
  }

  // Adicionar exemplares de um livro (aumentar a quantidade)
  static adicionarExemplares(id, quantidade, callback) {
    db.run('UPDATE livros SET quantidade = quantidade + ? WHERE id = ?', [quantidade, id], callback);
  }
}

module.exports = Livro;
