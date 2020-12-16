var mongoose = require('../bin/mongodb');
const errorMessage = require('../util/errorMessage')

const imagenSchema = new mongoose.Schema({
    fieldname: "String",
    originalname: "String",
    encoding: "String",
    mimetype: "String",
    destination: "String",
    filename: "String",
    path: "String",
    size: "String"
})

const productosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        maxlength: [40, errorMessage.GENERAL.maximo],
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        validate: {
            validator: async function (v) {
                const document = await this.model("productos").findOne({ nombre: v })
                if (document) {
                    return false;
                }
                return true;
            },
            message: errorMessage.GENERAL.repeticion
        }
    },
    sku: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        unique: true,
        trim: true,
        validate: {
            validator: async function (v) {
                const document = await this.model("productos").findOne({ sku: v })
                if (document) {
                    return false;
                }
                return true;
            },
            message: errorMessage.GENERAL.repeticion
        }
    },
    precio: {
        type: Number,
        required: [true, errorMessage.GENERAL.campo_obligatorio]
    },
    descripcion: {
        type: String,
        maxlength: [255, errorMessage.GENERAL.maximo]
    },
    stock: {
        type: Number,
    },
    categoria: {
        type: mongoose.Schema.ObjectId,
        ref: "categorias"
    },
    imagen: imagenSchema

});

productosSchema.virtual("image_path").get(function () {
    if (this.imagen && this.imagen.filename) {
        return "http://localhost:3000/images/" + this.imagen.filename;
    } else {
        return null;
    }

});

productosSchema.set('toJSON', { getters: true, virtuals: true });
productosSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("productos", productosSchema);