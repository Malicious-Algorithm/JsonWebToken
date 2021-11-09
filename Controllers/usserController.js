require('dotenv').config();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//------------------Validación---------------------//
const schemaValidate = Joi.object({
    nickname: Joi.string().min(8).max(200).required(),
    email: Joi.string().min(8).max(200).required().email(),
    password: Joi.string().min(8).max(200).required()
});
//-------------------------------------------------//

exports.registrar = async (req, res) => {
    const { error } = schemaValidate.validate(req.body);

    
    if(error){
     
        return res.status(400).json({
            error:  error.details[0].message
        });
    }
    
    try {
        
        const salt = await bcrypt.genSalt();
        const hashPasswd = await bcrypt.hash(req.body.password, salt);
        
        //creando user con password hasheada
        const user = { 
            nickname: req.body.nickname,
            email: req.body.email, 
            password: hashPasswd
        }
        
        //firmando con nuestra llave el jwt
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});;
        //const refreshToken = refrescarToken(user); 
        
        //pusheando a la BD
        let userModel = new User(user);
        await userModel.save();
   
        //respuesta al cli
        res.json([
            { accessToken: accessToken }, 
            { userModel }
        ]);

        res.status(201).send();

    } catch (error) {
        res.status(500).send();
    }
}

exports.verificarUser = async (req, res) => {
    
    try{
          const user = await User.findOne({nickname: req.body.nickname});
          const user2 = { 
            nickname: req.body.nickname, 
          }
        
            if(user == null) {
                res.status(400).json({status:'Usuario no encontrado'}) 
            }
            
            if(await bcrypt.compare(req.body.password, user.password)){
                const refreshToken = jwt.sign( user2, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15m'})
                res.json({
                    status:'Autenticado!',
                    refreshToken: refreshToken
                });
            }else{
                res.json({status:'Incorrecto'});
            }

        }catch (error) {
        res.status(500).send();
    }

}   


exports.authToken = (req, res, next) => {

    const token = req.header('Authorization');

    if(!token){
        return res.status(401).send("Acceso Denegado!");
    }

    try{
        //const verificado = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const verificado2 = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        
        req.user = verificado2
        next();
    
    }catch (error){
        res.status(400).send("El token no es válido!");
    }
}

exports.getUsuario = (req, res) => {
    res.json({
        error: null,
        data: {
            title: "Bienvenido Admin!",
            user: req.user
        }
    });
}
