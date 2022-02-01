const Topping = require('../models/topping')


const getToppings = async ( req, res ) => {

    const toppings = await Topping.find();

    res.json({
        ok: true,
        toppings
    })

}

const createTopping = async ( req, res ) => {

    const topping = new Topping( req.body )

    try {
        
       const toppingGuardado = await topping.save()

       return res.json({
           ok: true,
           toppingGuardado
       })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg :'Hable con el administrador'
        })
    }

}

const editTopping = async ( req, res ) => {

    const toppingId = req.params.id;

    try {

        const topping = await Topping.findById( toppingId )
        
        if( !topping ){
           return res.status(404).json({
                ok: false,
                msg: 'No existe un topping con ese id'
            })
        }

        const newTopping = {
            ...req.body
        }

        const toppingActualizado = await Topping.findByIdAndUpdate( toppingId, newTopping, { new: true })

        res.status(200).json({
            ok: true,
            topping: toppingActualizado
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'no existe un topping con ese id'
        })
    }

    

}


const deleteTopping = async ( req, res ) => {

    const toppingId = req.params.id;

    try {

        const topping = await Topping.findById( toppingId )
        
        if( !topping ){
           return res.status(404).json({
                ok: false,
                msg: 'No existe un topping con ese id'
            })
        }

     
        const removedTopping = await Topping.findByIdAndDelete( topping )

        res.status(200).json({
            ok: true,
            topping: removedTopping
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'no existe un topping con ese id'
        })
    }

}



module.exports = {
    getToppings,
    createTopping,
    editTopping,
    deleteTopping
}