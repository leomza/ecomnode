const productosModels = require('../models/productosModels');
var multer = require('multer');

var DIR = './public/images/';

var upload = multer({dest:DIR}).single('foto');

module.exports = {
    mostrarTodosProductos : async (req,res,next) =>{
        try{
        //En caso de que quiera hacer una busqueda tipo "like", aplico este primer parrafo    
        let buscarLike = {};
        if (req.query.buscar){
            buscarLike = {nombre:{$regex:".*"+req.query.buscar+".*",$options:"i"}};
        };        
        const productos = await productosModels.paginate(buscarLike,{
            sort:{nombre:1},
            //Puedo aplicar el "select" para mostrarlo en Postman pero en Angular tambien influiria: select: ["nombre", "precio"],
            populate: "categoria",
            limit : req.query.limit || 3,
            //Defino la pagina que quiero que muestre o en su defecto aplicara la numero 1
            page: req.query.page || 1
        });

        res.json(productos);
        } catch(mal) {
            next(mal);
        }
    },
    mostrarProductoId : async (req,res,next) =>{
        const producto = await productosModels.findById(req.params.id).populate("categoria");
        res.json(producto);
    },
   
   crearProducto : async (req,res,next) =>{
        try{
        const productos = new productosModels({
            nombre: req.body.nombre,
            sku: req.body.sku,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            stock: req.body.stock,
            categoria: req.body.categoria,
            imagen: req.body.imagen
        })
        const documento = await productos.save(); 
        res.json(documento);
    } catch(mal) {
        console.log(mal);
        next(mal);
    }
    },
    cargaArchivo: async (req,res,next) =>{
        try{
            upload (req,res,function(err){
                if (err){
                    console.log(err);
                    next();
                }
                    console.log(req.file);
                    res.status(201).json({status:"Success", message: "Imagen cargada con exito", data: req.file})
            })
           } catch (e){
                next(e);
        }
    },
    eliminarProducto: async (req, res, next) =>{
        try {
            console.log(req.params.id);
            const prod = await productosModels.findByIdAndDelete({ _id: req.params.id });
            console.log (prod)
            res.status(200).json(prod);
            return;
        } catch (e){
            next(e);
        }
    }
}