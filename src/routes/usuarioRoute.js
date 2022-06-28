
const express = require('express')

const usuarioRoute = express.Router();

const UsuarioController = require('../controller/UsuarioController')

usuarioRoute.get('/usuario', UsuarioController.index);

module.exports = usuarioRoute;