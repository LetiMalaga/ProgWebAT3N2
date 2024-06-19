# Livraria Online

Este projeto implementa uma aplicação web simples para uma livraria online, onde os usuários podem visualizar, buscar, adicionar, editar, remover e comprar livros. A aplicação utiliza Node.js com Express para o servidor backend e SQLite como banco de dados.

## Funcionalidades

- **Listagem dos livros**: Uma lista contendo todos os livros é fornecida na homePage e na página de compra de livros.
- **Cadastro de livros**: O cliente pode cadastrar novos livros na livraria.
- **Compra de livros**: O cliente pode comprar livros, diminuindo o número de exemplares disponíveis.
- **Adição de livros**: O cliente pode adicionar mais livros ao estoque, aumentando o número de exemplares disponíveis.
- **Edição de livros**: O cliente pode editar todas as informações referentes à um livro.
- **Remoção de livros do estoque**: O cliente pode remover todos os exemplares de um livro do estoque de uma única vez.
- **Busca**: Também na homePage, o cliente pode buscar por um título específico de livros.

## Estrutura do Projeto
```
- livraria
  - app.js
  - database.js
  - livros.json
  - package.json
  - package-lock.json
  - models
    - livro.js
  - routes
    - livros.js
  - views
    - index.html
    - adicionarLivros.html
    - buscarLivros.html
    - cadastrarLivros.html
    - comprarLivros.html
    - editarLivros.html
    - removerLivros.html
    - style.css
  - node_modules
    - ...
```

### Classe `Livro`

Representa um livro na livraria, contendo os seguintes atributos:
- `id`: int
- `titulo`: String
- `autor`: String
- `genero`: String
- `imagem`: String (url)
- `exemplares`: int

### Explicação de Estrutura
O projeto está estruturado da seguinte maneira:

app.js: Arquivo principal que configura e inicia o servidor Express.
routes/: Pasta contendo os arquivos de rotas da aplicação.
livros.js: Define as rotas para operações relacionadas aos livros, como listar, adicionar, editar, remover, etc.
models/: Pasta contendo os modelos de dados da aplicação.
livro.js: Define a classe Livro que encapsula as operações CRUD relacionadas aos livros.
views/: Pasta contendo os arquivos HTML das interfaces da aplicação.
index.html: Página inicial da aplicação com um botão para recarregar a lista de livros.
listarLivros.html: Página que lista todos os livros disponíveis.
buscarLivro.html: Página para buscar livros por título.
adicionarLivro.html: Página para adicionar um novo livro ao acervo.
editarLivro.html: Página para editar informações de um livro existente.
removerLivro.html: Página para remover um livro do acervo.
database.js: Arquivo que configura e inicializa o banco de dados SQLite e exporta a instância do banco de dados.
livros.json: Arquivo JSON contendo dados iniciais de livros para inicialização do banco de dados.
style.css: Arquivo CSS para estilização das páginas HTML.
README.md: Este arquivo, contendo descrição do projeto, estrutura e instruções de uso.

## Instalação e Uso
### Clonar o repositório:
`
git clone https://github.com/seu-usuario/livraria-online.git
cd livraria-online
`

### Instalar as dependências:
`
npm install
`

### Inicializar o servidor:
`
npm start
`

### Acessar a aplicação:
Abra o navegador e navegue para http://localhost:3000 para acessar a página inicial da livraria.

## Contribuição
Contribuições são bem-vindas! Se encontrar algum problema ou tiver sugestões de melhorias, por favor abra uma issue ou envie um pull request.

## Tecnologias Utilizadas
Node.js
Express
SQLite
HTML
CSS

## Considerações Finais
- Este projeto foi desenvolvido como parte de um exercício acadêmico/curso e pode não representar uma aplicação completa e pronta para produção em todos os aspectos.
- Certifique-se de configurar corretamente o ambiente de desenvolvimento e instalar todas as dependências antes de iniciar o servidor.
- Para ambientes de produção, considere configurar um banco de dados persistente em vez do SQLite em memória utilizado neste exemplo.
- A estilização das páginas pode ser expandida e ajustada conforme necessário para melhorar a experiência do usuário.
