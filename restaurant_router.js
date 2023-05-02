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
    const user_id = req.user.id
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
    } = req.body

        

   let restaurant = new RestaurantModel({
        user_id,
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
        food_images
    })

    await restaurant.save()

    res.send({
        message: " created Restaurant successfully",
        restaurant
    })
})


router.put('/edit/:restaurant_id', async (req, res) => {
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
        food_images
    } = req.body

    const id = req.params.restaurant_id;

    const restaurant = await RestaurantModel.findById(id)


    restaurant.name = name

    restaurant.save()

    res.send({
        message: "Updated Restaurant Successfully",
        restaurant
    })
})

router.get('/details/:restaurant_id', async (req, res) => {

    let id = req.params.restaurant_id
    console.log(req.params)
    
    const restaurant = await RestaurantModel.findById(id)
    console.log(restaurant)

    res.send({
        message: "retrieved restaurant successfully",
        restaurant
    })

})

router.get('/list', async (req, res) => {

    let user_id = req.user.id
    console.log(req.user)
    
    const restaurants = await RestaurantModel.find({user_id}, {name:1, approval_status:1, rejection_reason:1 })
    console.log(restaurants)

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

