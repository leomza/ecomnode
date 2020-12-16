const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt');
const errorMessage = require('../util/errorMessage')
const paraValidar = require('../util/validators')

const usuariosWebSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
        },
    apellido: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
        },
    telefono: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator:async function(v){
                return paraValidar.phoneValidate(v);
            },
            message: errorMessage.USUARIO.telefono_incorrecto
        }
    },

    email: {
        type: String,
        unique: true,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        trim:true,
        validate:{
            validator:async function(v){
                const document = await this.model("usuariosWeb").findOne({email:v})
                if (document){
                    return false;
                }
                return true,paraValidar.emailValidate;
            },
            message: errorMessage.GENERAL.repeticion
        },
        
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
usuariosWebSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();
})
usuariosWebSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("usuariosWeb",usuariosWebSchema);