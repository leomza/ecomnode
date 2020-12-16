var express = require('express');
const productosControllers = require('../controllers/productosControllers');
var router = express.Router();

var productosController = require('../controllers/productosControllers');

/* GET users listing. */
router.get('/', productosController.mostrarTodosProductos);
router.get('/:id', productosController.mostrarProductoId);
router.post('/', productosController.crearProducto);
router.post('/upload', productosController.cargaArchivo);
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;
