var express = require('express');
var router = express.Router();
var usuariosWeb = require('../controllers/usuariosWebControllers');

/* GET users listing. */
router.get('/', usuariosWeb.mostrarTodosUsuariosWeb);
router.post('/registro', usuariosWeb.crearUsuarioWeb);
router.post('/login',usuariosWeb.validate);
router.get('/:id', usuariosWeb.mostrarUsuarioWebId);
router.delete('/:id', usuariosWeb.eliminarUsuario);

module.exports = router;
