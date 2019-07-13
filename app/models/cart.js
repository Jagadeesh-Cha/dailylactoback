const mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
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
    },
    email: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    }
})
var Cart = mongoose.model('Cart', CartSchema);

module.exports = {
    Cart
};