

const Pizza = require('../models/pizza')


const getPizzas = async ( req, res ) => {

    const pizzas = await Pizza.find();

    res.json({
        ok: true,
        pizzas
    })

}

const makePizza = async ( req, res ) => {

    const pizza = new Pizza( req.body )

    try {
        
       const pizzaGuardada = await pizza.save()

       return res.json({
           ok: true,
           pizzaGuardada
           
       })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg :'Hable con el administrador'
        })
    }

}

const editPizza = async( req, res ) => {

    const pizzaId = req.params.id;

    try {
        const pizza = await Pizza.findById( pizzaId );
    
        if( !pizza ){
            res.status(404).json({
                ok: false,
                msg: 'No existe una pizza con ese id'
            })
        }

        const pizzaEditada = {
            ...req.body
        }

        const pizzaActualizada = await Pizza.findByIdAndUpdate( pizza, pizzaEditada , { new: true })

        res.status(200).json({
            ok: true,
            pizzaActualizada
        })
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
        
    }

}


const deletePizza = async ( req, res ) => {

    const pizzaId = req.params.id;

    try {
        const pizza = await Pizza.findById( pizzaId );
    
        if( !pizza ){
            res.status(404).json({
                ok: false,
                msg: 'No existe una pizza con ese id'
            })
        }

       

        const removedPizza = await Pizza.findByIdAndDelete( pizza )

        res.status(200).json({
            ok: true,
            removedPizza
        })
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
        
    }


}



module.exports = {
    getPizzas,
    makePizza,
    editPizza,
    deletePizza
}