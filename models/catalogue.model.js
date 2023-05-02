const mongoose = require('mongoose')

// const catalogueSchema = new mongoose.Schema({
//         name: {
//             type: String,
//             require: true
//         }
// })


const catalogueSchema = new mongoose.Schema({
    name: {
        type:String,
        require: true
    }
})

const Catalogue = mongoose.model('Catalogue', catalogueSchema)

module.exports = Catalogue






