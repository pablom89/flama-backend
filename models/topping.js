const { Schema, model } = require('mongoose');



const ToppingSchema = Schema({

      description:{
          type: String,
          required: true,
      },
      type:{
          type: String,
          required: true
      }
   
})


ToppingSchema.method('toJSON', function() {
    const { __v , _id, ...object } = this.toObject();
    object.id= _id;
    return object;
})

module.exports = model('Topping', ToppingSchema );