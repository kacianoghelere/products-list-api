# [products-list-api](https://arcane-wave-46173.herokuapp.com/)

Este projeto contém a API do projeto "Mercado Fácil", desenvolvido como parte desafio de desenvolvimento front-end da TodoCartões.

Você pode encontrar o projeto contendo o código de front-end em React [aqui](https://github.com/kacianoghelere/products-list-app).

## Como executar o projeto?
1. Clone o projeto
2. Utilize o comando `npm install` para adicionar as bibliotecas utilizadas
3. Você vai precisar de um banco `MySql` para rodar a API em modo de desenvolvimento
4. Utilize o comando `npx sequelize db:create` para criar o banco de dados
5. Utilize o comando `npx sequelize db:migrate` para criar as tabelas
6. Utilize o comando `npx sequelize db:seed:all` para popular as tabelas
7. Quando finalizar, utilize o comando `npm start` para iniciar o projeto

## Arquitetura aplicada
A API foi implementada para ser um serviço RESTful de comunicação com o App.
Uma variação da arquitetura MVC foi utilizada para implementação.
A autenticação de usuários é feita através de Json Web Tokens que podem ser adiquiridos durante a criação de usuários (não implementada) e o login.
A estrutura faz uso de `models` para representar entidades de bancos de dados e `controllers` para receber e responder requisições http em formato `json`.

## Tecnologias utilizadas
- Node.js (servidor de desenvolvimento com javascript)
- Express (Roteamento de endpoints)
- Sequelize (ORM)

## Link do projeto no Heroku (pendente)
[https://arcane-wave-46173.herokuapp.com/](https://arcane-wave-46173.herokuapp.com/)
