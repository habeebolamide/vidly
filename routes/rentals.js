const {Rental, validate} = require('../models/rental')
const { Movies } = require('../models/movie');
const { Customers } = require('../models/customer');
const express = require( 'express' )
const router = express.Router();
router.use(express.json())
const mongoose =  require('mongoose')


router.get('/', async (req,res) => {
    try {
        const rental = await Rental
        .find()
        .sort('dateOut')
        res.send(rental)
    } catch (error) {
        res.send(error.message)
    }
  
})

router.post('/', async (req, res) =>{
    const { error } =  validate(req.body)

    if (error) {
        return res.status(400).send (error.details[0].message)
    }
    if( !mongoose.Types.ObjectId.isValid(req.body.customerId)){
        return res.status(400).send (" Customer dosen't Exist")
    }
    if( !mongoose.Types.ObjectId.isValid(req.body.movieId)){
        return res.status(400).send (" Customer dosen't Exist")
    }
    const movie = await Movies.findById(req.body.movieId)
    if (!movie) {
      return res.status(400).send('Invalid Movie.')
    }

    const customer = await Customers.findById(req.body.customerId)
    if (!customer) {
        return res.status(400).send (" Customer dosen't Exist")
    }

    let rental = new Rental({ 
        customer: {
          _id: customer._id,
          name: customer.name, 
          phone: customer.phone
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        }
      });
      rental = await rental.save();
      if (movie.numberInStock === 0) {
        return res.status(400).send ("Movie Don Finish For Store")
      }
      movie.numberInStock --;
      movie.save();
      res.send(rental);
})

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
});


module.exports = router