const jwt = require('jsonwebtoken'),
        authConfig = require('../config/authConfig'),
        { dbConfig } = require('../database/db_con')

module.exports = (req, res, next)=>{
        if( !req.cookies['x-access-token']){
            res.render('Error/error', {msg: 'Acceso no autorizado'})
        }else{
            //comprobar la validez del token
            const token = req.cookies['x-access-token']
            
            jwt.verify(token, authConfig.secret, (err, decoded)=>{
                if(err){
                    res.render('Error/error', {msg: 'Ocurrio un problema en la autenticacion del token'})
                }else{
                    dbConfig.Usuario.findByPk( decoded.Usuario.id ).then(
                        Usuario => {
                            req.Usuario = Usuario
                            next()
                        }
                    ) 
                }
            })
            
        } 
    
}