var order = require('../models/order')
var resp = require('../constants/response')

function OrderController() {}

// POST order data
OrderController.postdata = function (req, res) {
    var postbody = req.body
    var data = {
        order_id: postbody.order_id,
        status_id: postbody.status_id,
        quantity: postbody.quantity,
        total_amount: postbody.total_amount
    }
    var savedata = new order(data)
    savedata.save(function (err, data_entered) {
        if (err) {
            res.json({
                'message': 'unable to save order'
            })
        } else {
            res.json({
                'message': 'order saved successfully'
            })
        }
    })
}

// GET order data
OrderController.getdata = function (req, res) {
    order.find({}, function (err, data_entered) {
        if (err) {
            res.json({
                'message': 'unable to get order'
            })
        } else {
            res.json(data_entered)
        }
    })
}

//GET order data by id
OrderController.getdatabyid = function (req, res) {
    order.findById(req.params.id, function (err, data_entered) {
        if (err) {
            res.json({
                'message': 'unable to get order'
            })
        } else {
            res.json(data_entered)
        }
    })
}

// DELETE order data
OrderController.deletedata = function (req, res) {
    var postbody = req.params.id
    order.findByIdAndRemove(postbody, function (err, data_entered) {
        if (err) {
            res.json({
                'message': 'unable to delete order'
            })
        } else {
            res.json({
                'message': 'order deleted successfully'
            })
        }
    })
}

// UPDATE order data
OrderController.putdata = function (req, res) {
    var postbody = req.body
    var data = {
        order_id: postbody.order_id,
        status_id: postbody.status_id,
        quantity: postbody.quantity,
        total_amount: postbody.total_amount
    }
    var updateId = req.params.id
    order.findByIdAndUpdate(updateId, data, function (err, data_entered) {
        if (err) {
            res.json({
                'message': 'unable to update order'
            })
        } else {
            res.json({
                'message': 'order updated successfully',
                data: data_entered
            })
        }
    })
}

module.exports = OrderController