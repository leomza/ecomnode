var express = require('express');
var router = express.Router();
var categoriasController = require('../controllers/categoriasControllers');

/* GET users listing. */
router.get('/', categoriasController.mostrarTodasCategorias);
router.post('/', (req,res,next)=>{req.app.funcionValidadora(req,res,next)} , categoriasController.crearCategoria);

module.exports = router;
