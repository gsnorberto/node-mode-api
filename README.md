# node-mode-api

# PROJETO DESENVOLVIDO JUNTO AO CURSO B7WEB. 

>> COMANDOS
npm init -y

npm install dotenv express pg pg-hstore sequelize validator

npm install --save-dev typescript

npx tsc --init

npm install -D @types/express @types/node @types/sequelize @types/validator

npm install -g nodemon
npm install -g typescript

npm install cors
npm install -D @types/cors

npm install mysql2

>> Biblioteca de upload
npm install multer
npm install -D @types/multer
>> Biblioteca de manipulação de Imagens
npm install sharp
npm install -D @types/sharp

>> LISTA DE FRASES (end point)
POST /frases -> adicionar nova frase

GET /frases -> obter todas frases
GET /frase/123 -> obter frase específica

PUT /frase/123 -> alterar uma frase

DELETE /frase/123 -> delerar uma frase