const mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
    status: {
        type: String
    },
    totalQuantity: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    email: {
        type: String
    }
})
var Order = mongoose.model('Order', OrderSchema);

module.exports = {
    Order
};