const {Genre, validate} = require('../models/genre')
const express = require( 'express' )
const router = express.Router();
router.use(express.json())
const mongoose =  require('mongoose')
const admin = require('../middleware/admin')

const auth = require('../middleware/auth')

router.get('/api/genre', async (req, res) => {
    const genre =  await Genre.find().sort('name')
    res.send(genre)
})

router.get('/api/genre/:id', async (req, res) => {
    const genre =  await Genre.find({_id:req.params.id})
    .sort('name')
    res.send(genre)
})

router.post('/api/genre', async (req, res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send (error.details[0].message)
    }
        let genre =  new Genre ({
            name : req.body.name
         })
            let result = await genre.save()
            res.send(result)
})

router.put('/api/genre/:id' , async (req, res) =>{
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
        const result =  await Genre.findByIdAndUpdate({_id:req.params.id}, {
            $set: {
                name:req.body.name
            }
        },
            { new :true}
        )
     
        res.send(result)
   
})

router.delete('/api/genre/:id', [auth,admin], async (req , res) => {
    const result = await Genre.deleteOne({_id:req.params.id})
    res.send(result)
} ) 


module.exports = router