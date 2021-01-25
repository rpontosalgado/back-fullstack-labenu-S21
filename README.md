back-fullstack-labenu-S21
=========================

Backend do Projeto Full Stack para a Labenu

Descrição do projeto
--------------------

Sistema que gerencia músicas.

Deploy: [Heroku](https://back-fullstack-labenu-s21.herokuapp.com)

![Badge](https://img.shields.io/badge/build-unstable-yellow)

Tabela de conteúdos
===================

<!--ts-->
  * [back-fullstack-labenu-S21](#back-fullstack-labenu-S21)
  * [Tabela de conteúdos](#tabela-de-conteudos)
  * [Features](#features)
    * [Autenticação de usuário](#autenticação-de-usuário)
    * [Criação de música](#criação-de-música)
    * [Leitura de música](#leitura-de-música)
    * [Criação de playlist](#criação-de-playlist)
    * [Adicionar música à playlist](#adicionar-música-à-playlist)
    * [Leitura de playlist](#leitura-de-playlist)
    * [Apagar músicas da playlist](#apagar-músicas-da-playlist)
  * [Tecnologias e Libs Utilizadas:](#tecnologias-e-libs-utilizadas)
  * [Pontos de melhoria](#pontos-de-melhoria)
  * [Autor](#autor)
<!--te-->

Features
========

Autenticação de usuário
-----------------------

- Signup

  - método `POST`

  - `/user/signup`

  - Request Body

    ```JSON 
    {
      "name": "",
      "email": "",
      "nickname": "",
      "password": ""
    }
    ```

  - Response

    ```JSON
    {
      "token": ""
    }
    ```

- Login

  - método `POST`

  
  - `/user/login`
  
  - input para login pode ser nickname ou email
  
  - Request Body 
  
    * (input para login pode ser nickname ou email)
  
    ```JSON 
    {
      "input": "",
      "password": ""
    }
    ```
  
  - Response
  
    ```JSON
    {
      "token": ""
    }
    ```

Criação de música
-----------------

- método `POST`

- `/music`

- Requer autenticação. Deve receber um token de usuário no parâmetro `authorization` do header.

- Request Body

  ```JSON 
  {
    "title": "",
    "album": "",
    "genres": ["","", ""],
    "file": ""
  }
  ```

Leitura de música
-----------------

- Requer autenticação. Deve receber um token de usuário no parâmetro `authorization` do header.

- método `GET`

- Lista completa, com tudo o que foi criado

  - `/music`

  - Response

    ```JSON
    {
      "music": [
        {
          "id": "",
          "title": "",
          "authorId": "",
          "album": "",
          "file": "",
          "date": Date,
          "authorName": "",
          "genres": ["", "", ""]
        },
      ]
    }
    ```

- Consulta de detalhe, exibe as informações apenas de um conteúdo

  - `/music/:id`

  - Response

    ```JSON
    {
      "music": {
        "id": "",
        "title": "",
        "authorId": "",
        "album": "",
        "file": "",
        "date": Date,
        "authorName": "",
        "genres": ["", "", ""]
      }
    }
    ```

- Consulta por filtro, exibe a lista de conteúdo que atenda um parâmetro buscado (genre, album, artist)

  - `/music/${parameter}={value}`

  - Response

    ```JSON
    {
      "music": [
        {
          "id": "",
          "title": "",
          "authorId": "",
          "album": "",
          "file": "",
          "date": Date,
          "authorName": "",
          "genres": ["", "", ""]
        },
      ]
    }
    ```

Criação de playlist
-------------------

- Requer autenticação. Deve receber um token de usuário no parâmetro `authorization` do header.

- método `PUT`

- `/playlist`

- Request Body

  * (`image` opcional)

  ```JSON
  {
    "title": "",
    "subtitle": "",
    "image": ""
  }
  ```

Adicionar música à playlist
---------------------------

- Requer autenticação. Deve receber um token de usuário no parâmetro `authorization` do header.

- método `PUT`

- `/playlist/music`

- Request Body

  ```JSON
  {
    "playlistId": "",
    "musicId": ""
  }
  ```

Leitura de playlist
-------------------

- Requer autenticação. Deve receber um token de usuário no parâmetro `authorization` do header.

- método `GET`

- Lista completa, com tudo o que foi criado

  - `/playlist`

  - Response

    ```JSON
    {
      "playlist": [
        {
          "id": "",
          "creatorId": "",
          "title": "",
          "subtitle": "",
          "image": "",
          "creatorName": "",
          "music": [
            {
              "id": "",
              "title": "",
              "authorId": "",
              "album": "",
              "file": "",
              "date": Date,
              "authorName": "",
              "genres": ["", "", ""]
            },
          ]
        }
      ]
    }
    ```

- Consulta de detalhe, exibe as informações apenas de um conteúdo

  - `/playlist/:id`

  - Response

    ```JSON
    {
      "playlist": {
        "id": "",
        "creatorId": "",
        "title": "",
        "subtitle": "",
        "image": "",
        "creatorName": "",
        "music": [
          {
            "id": "",
            "title": "",
            "authorId": "",
            "album": "",
            "file": "",
            "date": Date,
            "authorName": "",
            "genres": ["", "", ""]
          },
        ]
      }
    }
    ```

Apagar músicas da playlist
--------------------------

  - método `DELETE`

  - `/playlist/:playlistId/music/:musicId`

Tecnologias e Libs Utilizadas:
==============================

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com)
- [Knex](http://knexjs.org/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [cors](https://www.npmjs.com/package/cors)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [uuid](https://www.npmjs.com/package/uuid)

Recursos
========

Utilizando **banco de dados** fornecido pela e configurado pela [Labenu](https://www.labenu.com.br/) no curso `Desenvolvimento Web Full Stack`

Pontos de melhoria
==================

- Separar as entidades `album` e `genre` em modelos próprios para dar mais clareza e possibilidade de acrescentar mais informações

  - A entidade `album` poderia ter `id` próprio e acumular mais informações, como imagem de capa e data de criação

- Funcionalidades de remoção e edição de `music`, `user`, `album` e `playlist`

- Definir `roles` para diferentes tipos de usuários com diferentes permissões

  - Exemplos: `NORMAL`, `ADMIN`, `ARTIST`

- Adicionar paginação para os endpoints de leitura que retornam uma grande quantidade de itens

Autor
=====

**Roberto de Abreu Salgado**

Entre em contato:

[![Linkedin Badge](https://img.shields.io/badge/-Roberto-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/rsalgado3/) 
[![Gmail Badge](https://img.shields.io/badge/-r.salgado3@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:r.salgado3@gmail.com)](mailto:r.salgado3@gmail.com)
