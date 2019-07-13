var mongoose = require("mongoose")
const Schema = mongoose.Schema

var AddressSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    addressType: {
        type: String,
        required: true
    },
    userId: {
        type: String
    }
},{ collection: 'address' })

var address = mongoose.model("Address", AddressSchema)
module.exports = address