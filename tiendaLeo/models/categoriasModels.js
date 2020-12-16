const mongoose = require('../bin/mongodb');
const errorMessage = require('../util/errorMessage')

const categoriasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        unique: true,
        validate:{
            validator:async function(v){
                const document = await this.model("categorias").findOne({nombre:v})
                if (document){
                    //Si document existe (la categoria existe) por lo que devuelvo "false"
                    return false;
                }
                //Si no significa que la categoria no existe y devuelvo "true"
                return true;
            },
            message: errorMessage.GENERAL.repeticion
        }
        },    
});

module.exports = mongoose.model("categorias",categoriasSchema);