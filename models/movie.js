const mongoose =  require('mongoose')
const Joi = require("joi")
const { genreSchema } = require('./genre')
const Movies = mongoose.model('movie', mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      genre: { 
        type: genreSchema,  
        required: true
      },
      numberInStock: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      },
      dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }
})
) 

function validateRequest(movies) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
      };
      return Joi.validate(movies, schema);
}

exports.Movies = Movies;
exports.validate = validateRequest;
 