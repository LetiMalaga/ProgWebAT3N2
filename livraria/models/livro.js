const { db } = require('../database');

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
  static criar(livro, callback) {
    const { titulo, autor, genero, imagem, exemplares } = livro;
    db.run(
      'INSERT INTO livros (titulo, autor, genero, imagem, exemplares) VALUES (?, ?, ?, ?, ?)',
      [titulo, autor, genero, imagem, exemplares],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
        callback(null, this.lastID); // Retorna o ID do novo livro
      }
    );
  }

  // Atualizar as informações de um livro existente
  static atualizar(id, dados, callback) {
    const { titulo, autor, genero, imagem, exemplares } = dados;
    db.run(
      'UPDATE livros SET titulo = ?, autor = ?, genero = ?, imagem = ?, exemplares = ? WHERE id = ?',
      [titulo, autor, genero, imagem, exemplares, id],
      callback
    );
  }

  // Atualizar apenas o número de exemplares de um livro
  static atualizarExemplares(id, exemplares, callback) {
    db.run('UPDATE livros SET exemplares = ? WHERE id = ?', [exemplares, id], callback);
  }

  // Remover um livro do acervo
  static remover(id, callback) {
    db.run('DELETE FROM livros WHERE id = ?', [id], callback);
  }

  // Comprar um livro (diminuir exemplares)
  static comprar(id, quantidade, callback) {
    this.buscarPorId(id, (err, livro) => {
      if (err) {
        return callback(err);
      }
      if (!livro) {
        return callback(new Error('Livro não encontrado'));
      }

      const novosExemplares = livro.exemplares - quantidade;

      if (novosExemplares < 0) {
        return callback(new Error('Quantidade de exemplares insuficiente'));
      } else if (novosExemplares === 0) {
        this.remover(id, callback);
      } else {
        this.atualizarExemplares(id, novosExemplares, callback);
      }
    });
  }

  // Adicionar exemplares de um livro (aumentar exemplares)
  static adicionarExemplares(id, exemplares, callback) {
    this.buscarPorId(id, (err, livro) => {
      if (err) {
        return callback(err);
      }
      if (!livro) {
        return callback(new Error('Livro não encontrado'));
      }

      const novosExemplares = livro.exemplares + exemplares;
      this.atualizarExemplares(id, novosExemplares, callback);
    });
  }
}

module.exports = Livro;
