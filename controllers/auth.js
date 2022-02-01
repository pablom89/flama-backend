const { response } = require('express')
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')


const createNewUser = async ( req , res = response) => {

    const { password, name } = req.body; 

    try {
        
        let usuario = await Usuario.findOne({ name })

        if( usuario ){
           return res.status(400).json({
                ok: false,
                msg: 'Ya existe una cuenta asociada a ese nombre'
            })
        }
        
        usuario = new Usuario( req.body )

        // ENCRIPTAR PASSWORD 

        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password, salt )

        await usuario.save();

        // Generar JWT

        const token = await generarJWT( usuario.id, usuario.name )

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            
        })
        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const login = async ( req , res) => {

    const { password, name } = req.body;

    try {
        let usuario = await Usuario.findOne({ name })

        if( !usuario ){
           res.status(400).json({
                ok: false,
                msg: 'Por favor corrobora el nombre de usuario :)'
            })
        }

        // Generar JWT

        const token = await generarJWT( usuario.id, usuario.name )


        // Confirmar contraseñas

        const validPassword = bcrypt.compareSync( password, usuario.password )

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta :I'
            })
        }

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            
        })


    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
   
}


const renewToken = async ( req , res) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT( uid, name )    

    res.json({
        ok: true,
        uid,
        msg:'Ocurriò un error al renovar el token de seguridad',
        name,
        token
    })
    

}

module.exports = {
    createNewUser,
    login,
    renewToken
}