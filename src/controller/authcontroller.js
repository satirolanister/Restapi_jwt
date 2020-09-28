const jwt = require('jsonwebtoken');

const {bodyParser} = require('../lib/bodyParser');
const {usuario, contrasena, role}=require('../../user');
const {secret} = require('../config/config');


async function signUp (req, res) {
   try { 
    const data = await bodyParser(req);
    if(req.body.user != usuario){
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.write('Error en usuario, por favor intente nuevamente.');
        res.end();
    }else{
        if(req.body.password != contrasena){
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.write('Error en contraseña por favor intente nuevamente.');
            res.end();
        }else{
            const payload = {
                check: true,
                role
            };
            const token = jwt.sign(payload, secret);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(token));
            res.end();
        }
    }
    
   } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(error);
        res.end();
   }
    
}


module.exports = {
    signUp
}