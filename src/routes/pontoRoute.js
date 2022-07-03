const express = require('express')

const pontoRoute = express.Router();

const PontoController = require("../controller/PontoController")

pontoRoute.get('/ponto', PontoController.index);
pontoRoute.post('/ponto/:materia_id', PontoController.create);
pontoRoute.put('/ponto/:id', PontoController.update);
pontoRoute.get('/ponto/:id', PontoController.index);
pontoRoute.delete('/ponto/:id', PontoController.delete);

module.exports = pontoRoute;