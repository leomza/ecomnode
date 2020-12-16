var express = require('express');
var router = express.Router();

var usuariosBackoffice = require('../controllers/usuariosBackofficeControllers');

/* GET users listing. */
router.get('/', usuariosBackoffice.mostrarTodosUsuariosBackoffice);
router.get('/:id', usuariosBackoffice.mostrarPorIdUsuariosBackoffice);
router.post('/registro', usuariosBackoffice.crearUsuarioBackoffice);
router.post('/login',usuariosBackoffice.validate);

module.exports = router;
