const mongoose = require('../bin/mongodb');
const errorMessage = require('../util/errorMessage')

const pagosSchema = new mongoose.Schema ({
    status: {
        type: String,
        enum: ["generado", "pendiente", "pagado", "rechazado"]
    },
    metodo: {
        type: String,
        enum: ["efectivo", "mercadoPago"]
    },
    vencimiento: {
        type: Date
    }
})

const ventasSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        },
    usuario: {
        type: mongoose.Schema.ObjectId,
        ref: "usuariosWeb"
    },
    producto: {
        type: mongoose.Schema.ObjectId,
        ref: "productos"
    },
    importe: {
        type: Number,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
    } ,
    formaDePago : [pagosSchema]
    
});

module.exports = mongoose.model("ventas",ventasSchema);