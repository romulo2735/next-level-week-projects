## Be the Hero (api) 
    A api provém dados e ações para entidades: Ong's e Incidentes.
  ---
   ##### Primeiros passos
   
   - Clone o projeto: `$ git clone git@github.com:romulo2735/be-the-hero.git`.
   - Dentro da pasta do projeto, acesse a pasta da api: `$ cd back-end`.
   - Execute dependências: `$ npm install`.
   - Crie o banco de dados: `$ src/database/database.sqlite`.
   - Execute as migrations: `$ knex migrate:latest`.
   - Inicie o servidor: `$ npm start`.
   
   ##### Rotas
    Ongs
     - GET:  /ongs (lista todas as ongs)
     - POST: /ongs (cadastrar um nova ong)
     
     Incidents
      - GET:     /incidents (lista todas os incidents)   
      - POST:    /incidents (cadastra um novo incident) 
      - DELETE:  /incidents/{id}
      
     Profile
      - GET: /profile (lista todos os INCIDENTS de um determinada ONG)
    
     Session
      - POST: /sessions

 - Paginação
    - Nas rotas é possivel realizar a paginação de dados, na rota basta adicionar o parametro de `?page={numero_da_pagina`
    

#### Pacotes Ultilizados

-  [Knex](http://knexjs.org/#Installation-node), [Express](https://expressjs.com/en/starter/installing.html), [Nodemon](https://nodemon.io/)

    - Coleção JSON Postman: [POSTMAN](Semana%20OnmiStack%2011%20-%20Be%20The%20Hero.postman_collection.json) 

 
