/*
    Event Routes
    /api/evetns
*/
const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { isDate } = require("../helpers/isDate");
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

router.use( validarJWT ); // le indicamos que en todas las peticiones se debe validar el token
// todas deven de pasar por la validacion del JWT
//obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post('/', 
    [ 
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de Finalicazion es obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento);

//Actualizar eventos
router.put('/:id', 
    [ 
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de Finalicazion es obligatoria').custom(isDate),
        validarCampos,
    ],
   actualizarEvento);

//Borrar eventos
router.delete('/:id', eliminarEvento);

module.exports = router;