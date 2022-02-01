
const { Schema, model } = require('mongoose');

const comandaSchema = Schema({

    pizza: {
        type: Object,
        required: true
    }
    
})


comandaSchema.method('toJSON', function() {
    const { __v , _id, ...object } = this.toObject();
    object.id= _id;
    return object;
})

module.exports = model('Comanda', comandaSchema );