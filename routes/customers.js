const {Customers, validate} = require('../models/customer')
const express = require( 'express' )
const router = express.Router();
router.use(express.json())
const mongoose =  require('mongoose')

router.get('/', async (req,res) => {
    const customers = await Customers.find()

    res.send(customers)
})

router.get('/:id', async (req,res) => {
    const customer = await Customers.find(
        {_id :req.params.id }
    )

    res.send(customer)
})

router.post('/', async (req,res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send (error.details[0].message)
    }

    let customer = new Customers ({
        name : req.body.name,
        phone : req.body.phone
    })
        customer =  await customer.save()
        res.send(customer)
})

router.put('/:id', async(req,res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send (error.details[0].message)
    }

    const customer = await Customers.findByIdAndUpdate({_id:req.params.id} , {
        $set :{
            name : req.body.name,
            phone : req.body.phone 
        }
    },
        {new : true}
    )
})
router.delete ('/:id', async(req,res) => {
    const deleteCustomer = await Customers.findByIdAndDelete({_id:req.params.id})

    if (!deleteCustomer) {
        return res.send("Customer with Given Id Dosen't Exist")
    }
    return res.send("Operation Successful")

})


module.exports = router