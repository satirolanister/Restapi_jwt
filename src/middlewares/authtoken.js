const jwt = require('jsonwebtoken');
const {secret} = require('../config/config')


function validarToken (req, res, next) {
    const token = req.headers["x-access-token"];
    if(!token){
        return false;
    }else{
        const decode= jwt.verify(token, secret);
        console.log('Decode ',decode);
        return true;
    }
    
}


module.exports = {
    validarToken
}