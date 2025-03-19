/*
    Rutas de Usuarios / Auth
    host + /api/routes
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
    '/new', 
    [// Middelwares
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de 6 caracteres o mas').isLength({ min: 6 }),
        validarCampos
    ],
     createUser );

router.post(
    '/', 
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de 6 caracteres o mas').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUser );

router.get('/renew', validarJWT ,revalidateToken );


module.exports = router;