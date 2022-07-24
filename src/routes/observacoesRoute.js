const express = require('express')

const observacoesRoute = express.Router();

const observacoesController = require("../controller/ObservacoesController")
const aut = require('../aut/index');

observacoesRoute.get('/observacoes', aut.checkToken, observacoesController.index);
observacoesRoute.post('/observacoes', aut.checkToken, observacoesController.create);
observacoesRoute.put('/observacoes/:id', aut.checkToken, observacoesController.update);
observacoesRoute.get('/observacoes/:id', aut.checkToken, observacoesController.index);
observacoesRoute.delete('/observacoes/:id', aut.checkToken, observacoesController.delete);

module.exports = observacoesRoute;