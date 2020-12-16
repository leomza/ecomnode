const mongoose = require('../bin/mongodb');
const errorMessage = require('../util/errorMessage')
const paraValidar = require('../util/validators')
const bcrypt = require('bcrypt');

const usuariosBackofficeSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
        },
    apellido: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
        },
    username: {
        type: String,
        unique: true,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        trim:true,
        validate:{
            validator:async function(v){
                const document = await this.model("usuariosBackoffice").findOne({username:v})
                if (document){
                    return false;
                }
                return true;
            },
            message: errorMessage.GENERAL.repeticion
        }
        },
    password: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        trim:true,
        validate:{
            validator:async function(v){
                return paraValidar.isGoodPassword(v);
            },
            message: errorMessage.USUARIO.contraseña_incorrecta
        }
    },
    })

    usuariosBackofficeSchema.pre('save',function(next){
        this.password = bcrypt.hashSync(this.password,10);
        next();
    })

module.exports = mongoose.model("usuariosBackoffice",usuariosBackofficeSchema);