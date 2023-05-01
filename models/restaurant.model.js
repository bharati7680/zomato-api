const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
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
    // location: {
    //     type:{
    //         type: String,
    //         enum: ['Point'],
    //         required: true,
    //     },
    //     coordinates:{
    //         type: [Number],
    //         required: true
    //     }
    // },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number, 
        required: true
    }, 
    longitude: {
        type: Number, 
        required: true
    }, 
    cuisines: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cuisine'
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
            type: String
        }
    ], 
    food_images: [
        {
            type: String
        }
    ], 
    approval_status: {
        type: String, 
        enum: ['PENDING', 'REJECTED', 'VERIFIED'],
        default: 'PENDING'
    }, 
    rejection_reason: {
        type: String
    },
    created_at: {
        type : Date,
        default: Date.now
    }
});


const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant



