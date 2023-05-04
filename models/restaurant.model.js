const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }, 
    location: {
        type:{
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates:{
            type:[Number],
            required: true
        }
    },
    cuisines: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cuisine',
            require: true
        }
    ], 
    time_slot: [
        {
            start_time: Date,
            end_time: Date
        }
    ], 
    opening_days: [
        {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
    ], 
    restaurant_images: [
        {
            type: String,
            require: true

        }
    ], 
    food_images: [
        {
            type: String,
            require: true
        }
    ], 
    approval_status: {
        type: String, 
        enum: ['PENDING', 'REJECTED', 'VERIFIED'],
        default: 'PENDING'
    }, 
    rejection_reason: {
        type: String,
        default: ""
    },
    created_at: {
        type : Date,
        default: Date.now
    }
});


const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant



