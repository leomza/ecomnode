var express = require('express');
var router = express.Router();

var ventas = require('../controllers/ventasControllers');

/* GET users listing. */
router.post('/', (req,res,next)=>{req.app.funcionValidadora(req,res,next)} , ventas.crearVenta);

module.exports = router;
