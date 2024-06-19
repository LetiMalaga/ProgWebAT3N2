const express = require('express');
const router = express.Router();
const Livro = require('../models/livro');

// Rota para listagem dos livros
router.get('/', (req, res) => {
  Livro.listar((err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Rota para compra de um livro (diminuir exemplares)
router.post('/:id/comprar', (req, res) => {
  const id = req.params.id;
  const exemplares = parseInt(req.body.exemplares);
  
  Livro.buscarPorId(id, (err, livro) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!livro) {
      res.status(404).send('Livro não encontrado');
    } else {
      const novosExemplares = livro.exemplares - exemplares;
      
      if (novosExemplares < 0) {
        res.status(400).send('Quantidade de exemplares insuficiente');
      } else if (novosExemplares === 0) {
        Livro.remover(id, (err) => {
          if (err) {
            res.status(500).send(err.message);
          } else {
            res.send('Compra realizada com sucesso! Todos os exemplares foram comprados e o livro foi removido.');
          }
        });
      } else {
        Livro.atualizarExemplares(id, novosExemplares, (err) => {
          if (err) {
            res.status(500).send(err.message);
          } else {
            res.send('Compra realizada com sucesso!');
          }
        });
      }
    }
  });
});

// Rota para adição de exemplares de um livro (aumentar exemplares)
router.post('/:id/adicionar', (req, res) => {
  const id = req.params.id;
  const exemplares = parseInt(req.body.exemplares);
  Livro.adicionarExemplares(id, exemplares, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Exemplares adicionados com sucesso!');
    }
  });
});

// Rota para cadastro de novos livros
router.post('/', (req, res) => {
  const novoLivro = req.body;
  Livro.criar(novoLivro, (err, id) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send(`Livro cadastrado com sucesso! ID: ${id}`);
    }
  });
});

// Rota para busca de livro por título
router.get('/buscar', (req, res) => {
  const titulo = req.query.titulo;
  Livro.buscarPorTitulo(titulo, (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Rota para edição das informações de um livro do acervo
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const dadosAtualizados = req.body;
  Livro.atualizar(id, dadosAtualizados, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Livro atualizado com sucesso!');
    }
  });
});

// Rota para remoção de um livro
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Livro.remover(id, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Livro removido com sucesso!');
    }
  });
});

module.exports = router;
