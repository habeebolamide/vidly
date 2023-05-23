const mongoose =  require('mongoose')
const Joi = require("joi")

const Customers = mongoose.model('customer', mongoose.Schema({
    name :{
        type : String, 
        required : true,
        minlength:3
    },
    phone :{
        type : String,
        required : true,
        minlength : 3,
        maxlenght : 11
    },
    isGold: {
        type: Boolean,
        default: false
    },
})
) 

function validateRequest(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(11).required()
      };
    
      return Joi.validate(customer, schema);
}

exports.Customers = Customers;
exports.validate = validateRequest;
 