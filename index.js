const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
app.use(cors());
//const knex = require("./src/database/config");

//Autenticacao
require('dotenv').config();

app.use(express.json());
//Routas
const usuarioRoute = require('./src/routes/usuarioRoute');
const materiaRoute = require('./src/routes/materiaRoute');
const observacoesRoute =  require('./src/routes/observacoesRoute');
const pontoRoute = require('./src/routes/pontoRoute');
app.use(usuarioRoute);
app.use(materiaRoute);
app.use(observacoesRoute);
app.use(pontoRoute);

// trament de erro
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({error: error.message})
})
//app.db = knex;

app.get('/', (req, res) => res.send('Hello World 100!'))
app.listen(port, () => console.log(`port ${port}!`))
