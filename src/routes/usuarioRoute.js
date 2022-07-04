
const express = require('express')

const usuarioRoute = express.Router();

const UsuarioController = require('../controller/UsuarioController')

usuarioRoute.get('/usuario', UsuarioController.index);
usuarioRoute.get('/auth/login', UsuarioController.login);
usuarioRoute.post('/usuario', UsuarioController.create);
usuarioRoute.put('/usuario/:id', UsuarioController.update);
usuarioRoute.delete('/usuario/:id', UsuarioController.delete);

module.exports = usuarioRoute;