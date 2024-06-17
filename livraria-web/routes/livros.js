// routes/livros.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Caminho para o arquivo livros.json
const livrosJsonPath = path.join(__dirname, '..', 'livros.json');
const livrosJson = JSON.parse(fs.readFileSync(livrosJsonPath, 'utf-8'));

// Caminho para o banco de dados SQLite
const dbPath = path.resolve(__dirname, '..', 'db', 'livros.db');
const db = new sqlite3.Database(dbPath);

// Inicializar o banco de dados com os livros do livros.json
db.serialize(() => {
    db.run('DROP TABLE IF EXISTS livros');
    db.run('CREATE TABLE livros (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, autor TEXT, genero TEXT, imagem TEXT, exemplaresDisponiveis INTEGER DEFAULT 1)');

    const stmt = db.prepare('INSERT INTO livros (titulo, autor, genero, imagem) VALUES (?, ?, ?, ?)');
    livrosJson.books.forEach(livro => {
        stmt.run(livro.titulo, livro.autor, livro.genero, livro.imagem);
    });
    stmt.finalize();
});

// Listagem de todos os livros
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM livros';
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.render('listarLivros', { livros: rows });
    });
});

// Compra de um livro
router.post('/comprar', (req, res) => {
    const { id } = req.body;
    const sql = 'UPDATE livros SET exemplaresDisponiveis = exemplaresDisponiveis - 1 WHERE id = ?';
    db.run(sql, id, (err) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Livro comprado com sucesso' });
    });
});

// Adição de exemplares de um livro
router.post('/adicionar-exemplares', (req, res) => {
    const { id, quantidade } = req.body;
    const sql = 'UPDATE livros SET exemplaresDisponiveis = exemplaresDisponiveis + ? WHERE id = ?';
    db.run(sql, [quantidade, id], (err) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Exemplares adicionados com sucesso' });
    });
});

// Cadastro de novos livros
router.post('/adicionar', (req, res) => {
    const { titulo, autor, genero, imagem } = req.body;
    const sql = 'INSERT INTO livros (titulo, autor, genero, imagem) VALUES (?, ?, ?, ?)';
    const params = [titulo, autor, genero, imagem];
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Livro adicionado com sucesso', id: this.lastID });
    });
});

// Busca de livro por título
router.get('/buscar', (req, res) => {
    const { titulo } = req.query;
    const sql = 'SELECT * FROM livros WHERE titulo LIKE ?';
    db.all(sql, [`%${titulo}%`], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.render('buscarLivro', { livros: rows });
    });
});

// Edição das informações de um livro
router.put('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, imagem } = req.body;
    const sql = 'UPDATE livros SET titulo = ?, autor = ?, genero = ?, imagem = ? WHERE id = ?';
    const params = [titulo, autor, genero, imagem, id];
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Informações do livro atualizadas com sucesso' });
    });
});

// Remoção de um livro
router.delete('/remover/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM livros WHERE id = ?';
    db.run(sql, id, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Livro removido com sucesso' });
    });
});

module.exports = router;