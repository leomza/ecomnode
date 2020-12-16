const ventasModels = require('../models/ventasModels');

module.exports = {
    crearVenta : async (req,res,next) =>{
        try{
        const venta = new ventasModels({
            productoId: req.body.productoId,
            cantidad: req.body.cantidad,
            metodoDePago: req.body.metodoDePago,
            importe: req.body.importe,
            pago: {
                status: "generado",
                metodo: "mercadoPago",
                vencimiento: vencimiento,
            }
            })
        const documento = await venta.save();
        res.json(documento);
    } catch (mal){
        console.log(mal);
        next(mal);
    } 
    }
}