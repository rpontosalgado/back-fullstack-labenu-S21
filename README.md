back-fullstack-labenu-S21
=========================

Backend do Projeto Full Stack para a Labenu

Descrição do projeto
--------------------

Sistema que gerencia músicas.

Tabela de conteúdos
===================

<!--ts-->
  * [back-fullstack-labenu-S21](#back-fullstack-labenu-S21)
  * [Tabela de conteúdos](#tabela-de-conteudos)
  * [Features](#features)
    * [Autenticação de usuário](#autenticacao-de-usuario)
    * [Criação de música](#criacao-de-musica)
    * [Leitura de música](#leitura-de-musica)
    * [Criação de playlist](#criacao-de-playlist)
    * [Adicionar música à playlist](#adicionar-musica-a-playlist)
    * [Leitura de playlist](#leitura-de-playlist)
    * [Apagar músicas da playlist](#apagar-musicas-da-playlist)
  * [Tecnologias e Libs Utilizadas:](#tecnologias-e-libs-utilizadas)
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

Autor
=====

**Roberto de Abreu Salgado**

Entre em contato:

[![Linkedin Badge](https://img.shields.io/badge/-Roberto-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/rsalgado3/) 
[![Gmail Badge](https://img.shields.io/badge/-r.salgado3@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:r.salgado3@gmail.com)](mailto:r.salgado3@gmail.com)
