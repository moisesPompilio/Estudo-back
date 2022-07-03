const express = require('express')

const observacoesRoute = express.Router();

const observacoesController = require("../controller/ObservacoesController")

observacoesRoute.get('/observacoes', observacoesController.index);
observacoesRoute.post('/observacoes', observacoesController.create);
observacoesRoute.put('/observacoes/:id', observacoesController.update);
observacoesRoute.get('/observacoes/:id', observacoesController.index);
observacoesRoute.delete('/observacoes/:id', observacoesController.delete);

module.exports = observacoesRoute;