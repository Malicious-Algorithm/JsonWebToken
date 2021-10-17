//-------------- Requires --------------------------
const express = require('express').Router;
const route = express();
const userController = require('../Controllers/usserController');
//-------------------------------------------------

//---------------------     RUTAS    ----------------------------------
route.get('/admin', userController.authToken, userController.getUsuario);
route.post('/register', userController.registrar);

//la password matchea la que está hasheada en la bd
route.post('/users/login', userController.verificarUser);


module.exports = route;