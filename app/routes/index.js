// var ProductController = require("../controllers/product")
var express = require("express")
var OrderController = require("../controllers/order")
var AddressController = require('../controllers/address')
var app = express()

// var UserController = require('../controllers/userController')

/**
 * @author Faisal Siddiqui
 * @description These are the routes available in the application.
 * Each routes will have its respective implementation in controller.
 * Each routes validate's its appropriate accept or content type.
 * v1: Version 1
 */
module.exports = function routes(router) {

    // router.route("/products").get(ProductController.getdata)
    // router.route("/products/:id").get(ProductController.getdata)
    // router.route("/products").post(ProductController.postdata)
    // router.route("/products/:id").delete(ProductController.deletedata)
    // router.route("/products/:id").put(ProductController.putdata)

    // router.route("/order").get(OrderController.getdata)
    // router.route("/order/:id").get(OrderController.getdatabyid)
    // router.route("/order").post(OrderController.postdata)
    // router.route("/order/:id").delete(OrderController.deletedata)
    // router.route("/order/:id").put(OrderController.putdata)

    router.route("/address").get(AddressController.postdata)
    router.route("/address/:id").get(AddressController.getdatabyid)
    router.route("/address").post(AddressController.getdata)
    router.route("/address/:id").delete(AddressController.deletedata)
    router.route("/address/:id").put(AddressController.putdata)

    // const userController = require('./../controllers/userController');
    // app.use('/users', userController);
    // const productController = require('./../controllers/productController');
    // app.use('/products', productController);
    // const cartController = require('./../controllers/cartController');
    // app.use('/carts', cartController);
    // const orderController = require('./../controllers/orderController');
    // app.use('/orders', orderController);

}