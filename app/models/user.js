const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    mobile: {
        type: Number,
        match: /^[789]\d{9}$/
    },
    email: {
        type: String,
        required: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password: {
        type: String,
        required: true,
        validation: /^.{6,}$/
    },
    avatar: {
        type: Buffer
    },
    confirmed: {
        type: Boolean,
        defaultValue: false
    },
    otp: {
        type: String
    }
})
var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};