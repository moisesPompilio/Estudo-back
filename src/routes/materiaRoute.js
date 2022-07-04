const express = require('express')

const materiaRoute = express.Router();

const MateriaController = require("../controller/MateriaController")
const aut = require('../aut/index');

materiaRoute.get('/materia', aut.checkToken, MateriaController.index);
materiaRoute.post('/materia', MateriaController.create);
materiaRoute.put('/materia/:id', MateriaController.update);
materiaRoute.get('/materia/:id', MateriaController.index);
materiaRoute.delete('/materia/:id', MateriaController.delete);

module.exports = materiaRoute;