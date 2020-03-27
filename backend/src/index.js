//require as dependencias
const express = require ('express');

//CORS
const cors = require('cors');

//importando as routes (routes.js)
const routes = require ('./routes');

//variavel que irá conter a aplicação
const app = express();

app.use(cors());
//utilização do Json para o express (reconhecer os parâmetros enviados como json)
app.use(express.json());

//utilizar as rotas
app.use(routes);

//anotações
//acesso aos parametros enviados na query params (parametros enviados na url)
    //const params = request.query;

    //acesso aos parametros enviados via rota exemplo: localhost:3333/users/{id} 
    // Este id seria acessado via o request.params;
    //const paramsRoute = request.params;

    //acesso aos parametros enviados via request body (exemplo vindo POST)
    //const paramsBody = request.body;

    
// configurando a porta que será utilizada
app.listen(3333);

