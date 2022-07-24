const express = require('express')

const materiaRoute = express.Router();

const MateriaController = require("../controller/MateriaController")
const aut = require('../aut/index');

materiaRoute.get('/materia', aut.checkToken, MateriaController.index);
materiaRoute.post('/materia',aut.checkToken, MateriaController.create);
materiaRoute.put('/materia/:id', aut.checkToken, MateriaController.update);
materiaRoute.get('/materia/:id', aut.checkToken, MateriaController.index);
materiaRoute.delete('/materia/:id', aut.checkToken, MateriaController.delete);

materiaRoute.get('/aut/refresh', aut.refrehToken);

module.exports = materiaRoute;