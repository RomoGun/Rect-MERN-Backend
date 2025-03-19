const { response } = require('express');
const Evento = require('../models/Eventos');

const getEventos = async( req, res ) => {

    const eventos = await Evento.find()
                                    .populate('user','name');

    res.json({
        ok: true,
        eventos
    });
}

const crearEvento = async( req, res ) => {

    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }

    res.json({
        ok: true,
        msg: 'crearEvento'
    });
}

const actualizarEvento = async( req, res ) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId);
        const uid = req.uid;

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Error 404'
            });
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar el evento'
            });
        }

        const nuevoEcento = {
            ...req.body,
            user: uid
        }

        const eventoAxctualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEcento, { new:true } );//new en true es para que retorne los datos actualizados

        res.json({
            ok: true,
            evento: eventoAxctualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
    }
}

const eliminarEvento = async( req, res ) => {
    
    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId);
        const uid = req.uid;

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Error 404'
            });
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para Eliminar el evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId, );

        res.json({ ok: true,  });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}