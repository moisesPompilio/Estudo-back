const express = require('express')

const pontoRoute = express.Router();

const PontoController = require("../controller/PontoController")
const aut = require('../aut/index');

pontoRoute.get('/ponto', PontoController.index);
pontoRoute.post('/ponto/:materia_id', PontoController.create);
pontoRoute.put('/ponto/:id', aut.checkToken, PontoController.update);
pontoRoute.get('/ponto/:id', aut.checkToken, PontoController.index);
pontoRoute.delete('/ponto/:id', aut.checkToken, PontoController.delete);

module.exports = pontoRoute;