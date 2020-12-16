const usuariosBackofficeModels = require('../models/usuariosBackofficeModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    mostrarTodosUsuariosBackoffice : async (req,res,next) =>{
        const usuario = await usuariosBackofficeModels.find({});
        res.json(usuario);
    },
    crearUsuarioBackoffice : async (req,res,next) =>{
        try{
        const usuario = new usuariosBackofficeModels({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            username: req.body.username,
            password: req.body.password,
               })
        const documento = await usuario.save(); 
        res.json(documento);
    } catch (mal){
        console.log(mal);
        next(mal);
    }
    },
    mostrarPorIdUsuariosBackoffice : async (req,res,next) =>{
        const user = await usuariosBackofficeModels.findById(req.params.id);
        res.json(user);
    }, 
    validate: async (req, res, next) => {
        const userBack = await usuariosBackofficeModels.findOne({ username: req.body.username });
        if (userBack) {
            if (bcrypt.compareSync(req.body.password, userBack.password)) {
                //Genero el token
                const token = jwt.sign({ userId: userBack.username }, req.app.get('claveSecreta'), { expiresIn: "24h" });
                res.json({ message: "Usuario y contraseña correctos", token: token });
            } else {
                res.json({ message: "Contraseña incorrecta" });
            }
        } else {
            res.json({ message: "Usuario incorrecto" })
        }
    }
};