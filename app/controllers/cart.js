const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var {
    Cart
} = require('../models/cart');

router.get('/', (req, res) => {
    try {
        // const decoded = jwt.verify(req.params.token, process.env.JWT_KEY)
        // const userEmail = decoded.email;
        Cart.find({
                // email: userEmail
            })
            .exec()
            .then(carts => {
                res.send(carts)
            })
    } catch (err) {
        console.error(err);
        res.send(err);
    }
});

router.post('/', (req, res) => {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
    const userEmail = decoded.email
    var cart = new Cart({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock,
        variant: req.body.variant,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        isAvailable: req.body.isAvailable,
        email: userEmail,
        quantity: 1
    });
    cart.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.error('Error in adding to cart :' + JSON.stringify(err, undefined, 2));
            res.send(err)
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Cart.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Deletion :' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var cart = new Cart({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock,
        variant: req.body.variant,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        isAvailable: req.body.isAvailable,
        email: req.body.email,
        quantity: req.body.quantity
    });
    Cart.findByIdAndUpdate(req.params._id, {
        $set: cart
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2));
        }
    });
});


module.exports = router;