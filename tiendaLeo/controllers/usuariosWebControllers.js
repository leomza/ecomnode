const usuarioWebModels = require('../models/usuariosWebModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var transporter = require('../bin/email');
const usuariosWebModels = require('../models/usuariosWebModels');

module.exports = {
    mostrarTodosUsuariosWeb: async (req, res, next) => {
        const usuario = await usuarioWebModels.paginate({ }, {limit : req.query.limit || 3, page: req.query.page || 1});
        res.json(usuario);
        console.log(usuario)
    },

    mostrarUsuarioWebId : async (req,res,next) =>{
        const user = await usuariosWebModels.findById(req.params.id);
        res.json(user);
    }, 

    crearUsuarioWeb: async (req, res, next) => {
        try {
            const usuario = new usuarioWebModels({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                email: req.body.email,
                password: req.body.password,
            })
            const documento = await usuario.save();
            res.json(documento);
            //Para enviar un mail cuando creo el usuario:
            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: req.body.email,
                subject: "Bienvenido a la tienda de Leo, "+ req.body.nombre,
                text: "Gracias por registrarte en 'La tienda de Leo'!"
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if(error){
                    console.log("ERROR!", error);
                } else {
                    console.log("Email enviado: "+ info.response);
                } 
            });
            
        } catch (mal) {
            console.log(mal);
            next(mal);
        }
    },
    validate: async (req, res, next) => {
        //Chequeo que el email brindado por el usuario sea el mismo al de la base de datos:
        const userWeb = await usuarioWebModels.findOne({ email: req.body.email });
        if (userWeb) {
            //Comparo si la contraseña brindad es igual a la de la base de datos:
            if (bcrypt.compareSync(req.body.password, userWeb.password)) {
                //Si todo esta bien, genero el token:
                const token = jwt.sign({ userId: userWeb.email, userName: userWeb.nombre,
                                         userApellido: userWeb.apellido, userTelefono : userWeb.telefono }, req.app.get('claveSecreta'), { expiresIn: "24h" });
                res.json({ message: "Usuario y contraseña correctos", token: token });
            } else {
                res.json({ message: "Contraseña incorrecta" });
            }
        } else {
            res.json({ message: "Usuario incorrecto" })
        }
    },
    eliminarUsuario: async (req, res, next) =>{
        try {
        const usuario = await usuarioWebModels.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json(usuario);
         } catch (e){
             next(e);
         }
    },
    /*
    resetPasword: async (req,res,next) =>{
        const contraWeb = await usuarioWebModels.findOne({ id: req.body._id });
            if (contraWeb){
                contraWeb.destroy({id: req.body._id

                })
            }        
    }*/ 
};