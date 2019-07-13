const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var {
    Cart
} = require('../models/cart');

var {
    Order
} = require('../models/order');

router.post('/', (req, res) => {
    console.log(req.body)
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
    const userEmail = decoded.email
    var i;
    var j;
    var totalPrice = 0;
    var totalQuantity = 0;
    Cart.find({
            email: userEmail
        })
        .then(carts => {
            carts.forEach((e) => {
                if (e) {
                    totalQuantity += e.quantity;
                    totalPrice += (e.price) * (e.quantity)
                }

            })
            var order = new Order({
                status: "not-bought",
                totalQuantity: totalQuantity,
                totalPrice: totalPrice,
                email: userEmail
            });
            order.save((err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.error('Error in adding to cart :' + JSON.stringify(err, undefined, 2));
                    res.send(err)
                }
            });
        })
        .catch((err) => {
            console.log(err)
        })

});

router.put('', (req, res) => {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
    const userEmail = decoded.email
    try {
        Order.find({
                email: userEmail
            } && {
                status: "not-bought"
            })
            .exec()
            .then(orders => {
                orders[orders.length - 1].status = "bought";
                orders[orders.length - 1].save()
            })
        res.send("order placed")
    } catch (err) {
        res.send(err);
    }

});

router.get('/', (req, res) => { // need to uncomment these lines when the http-interceptor is working
    try {
        // const decoded = jwt.verify(req.params.token, process.env.JWT_KEY)
        // const userEmail = decoded.email;
        Order.find({
                // email: userEmail
            })
            .exec()
            .then(orders => {
                res.send(orders)
            })
    } catch (err) {
        console.error(err);
        res.send(err);
    }
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Order.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Deletion :' + JSON.stringify(err, undefined, 2));
        }
    });
});


module.exports = router;