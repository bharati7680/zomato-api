const express = require('express')
const router = express.Router()

const CuisineModel = require('./models/cuisine.model')
const RestaurantModel = require('./models/restaurant.model')
const CatalogueModel = require('./models/catalogue.model')



//  Cuisine Api

router.get('/cuisine', async (req, res) => {

    const Cuisines = await CuisineModel.find()

    res.send({
        message: "Cuisines retrieved successfully",
        Cuisines
    })
})

//  Restaurant Api's

router.post('/add', async (req, res) => {
    
    const {
        name,
        contact, 
        email, 
        address,
        latitude,
        longitude,
        cuisines, 
        time_slot,
        opening_days,
        restaurant_images,
        food_images,
        approval_status,
        rejection_reason  } = req.body

        

    Restaurant = new RestaurantModel({
        name, 
        contact, 
        email, 
        address,
        latitude,
        longitude,
        cuisines, 
        time_slot,
        opening_days,
        restaurant_images,
        food_images,
        approval_status,
        rejection_reason
    })

    await Restaurant.save()

    res.send({
        message: "Restaurant added successfully",
        Restaurant
    })
})


router.put('/edit', async (req, res) => {
    const {
        name,
        contact, 
        email, 
        address,
        latitude,
        longitude,
        cuisines, 
        time_slot,
        opening_days,
        restaurant_images,
        food_images,
        approval_status,
        rejection_reason
    } = req.body

    Restaurant = new RestaurantModel({
        name, 
        contact, 
        email, 
        address,
        latitude,
        longitude,
        cuisines, 
        time_slot,
        opening_days,
        restaurant_images,
        food_images,
        approval_status,
        rejection_reason
    })

    await Restaurant.save()

    res.send({
        message: "Restaurant added successfully",
        Restaurant
    })
})

router.get('/details', async (req, res) => {

    const restaurants = await RestaurantModel.find()

    res.send({
        message: "retrieved restaurant successfully",
        restaurants
    })

})

router.post('/category', async (req, res) => {

    const name = req.body

    const Category = new CatalogueModel({name})
    
    await Category.save()

    res.send({
        message: "category created successfully",
        Category
    })

})

module.exports = router