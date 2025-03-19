const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve,reject) => {// retornamos una promesa
        const payload = { uid, name }; // creamos el payload con el id y nombre del usuario
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { // firmamros el Token con la informacion del payload la palabra secreta que viene siendo la firma como tal
            expiresIn: '2h', //como tercer argumento le indicamos en cuanto tiempo va a expirar 
        }, (err, token) => { // y como cuarto argumento resivimos el erro y el token en un calkback
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);
        });
    })
}

module.exports = {
    generarJWT
}
