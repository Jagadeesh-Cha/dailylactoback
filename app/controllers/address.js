var address = require("../models/address");
var resp = require("../constants/response");

function AddressController() {}

// POST address data
AddressController.postdata = function (req, res) {
    var postbody = req.body;
    var data = {
        fullName: postbody.fullName,
        phoneNumber: postbody.phoneNumber,
        pincode: postbody.pincode,
        addressLine1: postbody.addressLine1,
        addressLine2: postbody.addressLine2,
        landmark: postbody.landmark,
        city: postbody.city,
        state: postbody.state,
        country: postbody.country,
        addressType: postbody.addressType,
        userId: postbody.userId
    }
    var savedata = new address(data);
    savedata.save(function (err, data_entered) {
        if (err) {
            res.json(resp.UNABLE_TO_ADD_ADDRESS);                
        }
        else {
            res.json(resp.REGISTRATION_SUCCESS);                   
        }
    })
}

// GET address data
AddressController.getdata = function (req, res) {
    address.find({}, function (err, data_entered) {
        if (err) {
            res.json(resp.UNABLE_TO_GET_DATA);            
        }
        else {
            res.json(resp.COMMAND_SUCCESS);                   
        }
    })
}

// GET address data by id
AddressController.getdatabyid = function (req, res) {
    address.findById(req.params.id, function (err, data_entered) {
        if (err) {
            res.json(resp.UNABLE_TO_GET_DATA);            
        } else {
            res.json(resp.COMMAND_SUCCESS);                               
        }
    })
}

// DELETE user data
AddressController.deletedata = function (req, res) {
    var postbody = req.params.id;
    address.findByIdAndRemove(postbody, function (err, data_entered) {
        if (err) {
            res.json(resp.UNABLE_TO_DELETE_ADDRESS);                            
        }
        else {
            res.json(resp.COMMAND_SUCCESS);                                      
        }
    })
}

// UPDATE user data
AddressController.putdata = function (req, res) {
    var postbody = req.body;
    var data = {
        fullName: postbody.fullName,
        phoneNumber: postbody.phoneNumber,
        pincode: postbody.pincode,
        addressLine1: postbody.addressLine1,
        addressLine2: postbody.addressLine2,
        landmark: postbody.landmark,
        city: postbody.city,
        state: postbody.state,
        country: postbody.country,
        addressType: postbody.addressType
    }
    var updateId = req.params.id;
    address.findByIdAndUpdate(updateId, data, function (err, data_entered) {
        if (err) {
            res.json(resp.INVALIDUPDATE);                                   
        }
        else {
            res.json(resp.UPDATE_SUCCESS);                                            
        }
    })
}

module.exports = AddressController;