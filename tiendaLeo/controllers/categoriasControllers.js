const categoriasModels = require('../models/categoriasModels');

module.exports = {
    mostrarTodasCategorias : async (req,res,next) =>{
        const categoria = await categoriasModels.find({}).sort({nombre:1});
        res.json(categoria);
    },
    crearCategoria : async (req,res,next) =>{
        try{
        const categoria = new categoriasModels({
            nombre: req.body.nombre,
               })
        const documento = await categoria.save();
        res.json(documento); 
    } catch (mal) {
        console.log(mal)
        //Al next le paso "mal" que es la excepcion como parametro, esp lo recibe app.js en Error Handler predefinido como "err"
        next(mal);
    }
    }
}