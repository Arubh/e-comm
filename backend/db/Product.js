const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: String,
        category: String,
        price: String,
        company: String,
        userID: String,
    }
)

module.exports = mongoose.model('products',productSchema)