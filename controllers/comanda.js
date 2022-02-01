const Comanda = require('../models/comanda');

const createComanda = async( req, res ) =>{

    const comanda = new Comanda( req.body );

    try {

        const comandaGuardada = await comanda.save()

        return res.status(201).json({
            ok: true,
            comandaGuardada
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Por favor hable con el administrador'
        })
        
    }

   
}

const getLastComanda = async ( req, res ) =>{ 

    try {
        
        const lastComanda = await Comanda.find().sort({$natural:-1}).limit(1)

        res.status(201).json({
            ok: true,
            lastComanda
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Por favor hable con el administrador'
        })
    }

}

module.exports = {
    createComanda,
    getLastComanda
}