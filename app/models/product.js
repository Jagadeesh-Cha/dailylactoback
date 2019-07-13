const mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    stock: {
        type: Number
    },
    variant: {
        type: String
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    isAvailable: {
        type: Boolean
    }
})
var Product = mongoose.model('Product', ProductSchema);

module.exports = {
    Product
};