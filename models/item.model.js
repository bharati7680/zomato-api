const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    require: true
  }, 
  image_url: {
    type: String,
    requirel: true
  },
  is_veg: {
    type: Boolean,
    require: true
  },
  approval_status: {
    type: String,
    enum: [ 'PENDING', 'REJECTED', 'VERIFIED'],
    default: 'PENDING'
  }, 
  rejection_reason: {
    type: String,
    default: ""
  }
  
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
