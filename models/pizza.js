const { Schema, model } = require('mongoose');



const PizzaSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    content:{
        type: Array,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    }

    
})


PizzaSchema.method('toJSON', function() {
    const { __v , _id, ...object } = this.toObject();
    object.id= _id;
    return object;
})

module.exports = model('Pizza', PizzaSchema );