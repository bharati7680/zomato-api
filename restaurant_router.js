const express = require('express')
const router = express.Router()

const CuisineModel = require('./models/cuisine.model')
const RestaurantModel = require('./models/restaurant.model')
const CatalogueModel = require('./models/catalogue.model')
const ItemModel = require('./models/item.model')



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
        longitude,
        latitude,
        cuisines, 
        time_slot,
        opening_days,
        restaurant_images,
        food_images,
    } = req.body


    let location = {
		type: "Point",
		coordinates: [
            longitude, 
            latitude
        ]
	}
        
   let restaurant = new RestaurantModel({
        user_id,
        name, 
        contact, 
        email, 
        address,
        location,
        cuisines, 
        time_slot,
        opening_days,
        restaurant_images,
        food_images
    })

    await restaurant.save()

    res.send({
        message: "created Restaurant successfully",
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

    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
        id,
        {
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
        },
        {new: true}
    )


    // restaurant.name = name

    // restaurant.save()

    res.send({
        message: "Updated Restaurant Successfully",
        updatedRestaurant
    })
})

router.get('/details/:restaurant_id', async (req, res) => {

    let id = req.params.restaurant_id
    // console.log(req.params)
    
    const restaurant = await RestaurantModel.findById(id)
    // console.log(restaurant)

    res.send({
        message: "retrieved restaurant successfully",
        restaurant
    })

})

// Retrieve Restaurants details of particular user/owner (restaurant)

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

// catalogue Api's

router.post('/category', async (req, res) => {

    const { restaurant_id, category_name } = req.body

    let catalouge = await CatalogueModel.findOne({restaurant_id: restaurant_id})

    if(!catalouge) {
        catalouge = new CatalogueModel({
            restaurant_id: restaurant_id,
            categories: []
        })
    }

    catalouge.categories.push({
        name: category_name,
        items: []
    })
    
    await catalouge.save()

    res.send({
        message: "category added successfully",
        catalouge
    })
})

// Item Apis

router.post('/item', async (req, res) => {
    const {
        restaurant_id, 
        category_id,
        name,
        price,
        description,
        image_url,
        is_veg
    } = req.body

    const catalogue = await CatalogueModel.findOne({restaurant_id}) 
    // console.log(catalogue)

    const item = new ItemModel({
        name, 
        category_id,
        price,
        description,
        image_url,
        is_veg
    })
   let itemResult = await item.save()


    // const catalogue = await CatalogueModel.findOne({restaurant_id})

    const category = catalogue.categories.find(category => category._id.toString() === category_id)
    if(!category.items){
        category.items = []
    }
    category.items.push(itemResult._id)

    await catalogue.save()  

    res.send({
        message: "Item created successfully",
        item
    })
}) 

router.put('/item/:item_id', async (req, res) => {

    const {
            name,
            category_id,
            price,
            description,
            image_url,
            is_veg
    } = req.body

    const id = req.params.item_id;
    // console.log(id)

    const updatedItem = await ItemModel.findByIdAndUpdate(
        id, 
        {
            name,
            category_id,
            price,
            description,
            image_url,
            is_veg
        }, 
        {new: true}
    )
    // console.log()


        // Item.name = name,
        // Item.category_id = category_id,
        // Item.price = price,
        // Item.description = description,
        // Item.image_url = image_url,
        // Item.is_veg = is_veg 
        
        // updatedItem.save()

    res.send({
        message: "Updated Item Successfully",
        updatedItem
        
    })

})

router.get('/catalogue/:restaurant_id', async (req, res) => {
    
    const id = req.params.restaurant_id
    console.log(id)
    
    const catalogue = await CatalogueModel.findOne({restaurant_id: id})

    res.send({
        message: "retrieved catalogue successfully",
        catalogue
    })
})


// router.get('/item/details', async (req, res) => {

//         // const category = await CatalogueModel.findById(id)
//         const itemDetails = await ItemModel.find()


//         res.send({
//             message: "Retrieves Item Details Successfully",
//             itemDetails
//         })
// })




module.exports = router

