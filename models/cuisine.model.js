const mongoose = require('mongoose')

const cuisineSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
})

const Cuisine = mongoose.model('Cuisine', cuisineSchema)


module.exports = Cuisine;