## Happy service api
    A api fornece o ecossitema todos dos orfanatos. 
    
- Instalando as dependências
    ````npm
    npm install 
    ````

    ##### Inciando o servidor
    ```npm
    npm run dev
    ```
  
    ##### Criando migrations
    
    É utilizado o pacote `TYPEORM` que irá gerir as versões das tabelas do banco de dados.
    Para criar uma migration é simple, basta executar o comando: 
    ```npm
    npx typeorm migration:create -n create_orphanages
    ```
  
    - `migrations` são armazenadas dentro de `src/database/migrations`.
    
    ##### Executando migrations
    
    ```npm 
    npx typeorm migration:run
    ```
  
## Orphanages (orfanatos)