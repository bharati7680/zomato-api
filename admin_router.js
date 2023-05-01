const express = require('express')
const router = express.Router()

const CuisineModel = require('./models/cuisine.model')


router.post('/cuisine', async (req, res) => {

    const {name, status} = req.body

    Cuisine = new CuisineModel({name, status})

    await Cuisine.save()

    res.send({
        message: "Cuisine created successfully",
        Cuisine
    })
})

router.get('/cuisine', async (req, res) => {

     const Cuisines = await CuisineModel.find()

     res.send({
        message: "Cuisines retrieved successfully",
        Cuisines
     })
})

module.exports = router