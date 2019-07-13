var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocument = YAML.load("./swagger.yaml")
const {
    messages
} = require("./app/constants/messages")

var options = {
    explorer: true
}

var app = express()
var mongoose = require("mongoose")
const PORT = process.env.PORT

const cors = require("cors")

const routes = require("./app/routes/index")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())
routes(app)
app.use(cors({
    origin: "*"
}))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

const orderController = require('./app/controllers/orderController');
app.use('/orders', orderController);
const userController = require('./app/controllers/user');
app.use('/users', userController);
const cartController = require('./app/controllers/cart');
app.use('/carts', cartController);
const productController = require('./app/controllers/product');
app.use('/products', productController);


mongoose.Promise = global.Promise
mongoose.connect(process.env.database, {
    useNewUrlParser: true
}, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("connected to database")
    }
})

const server = app.listen(PORT, () => {
    console.log(JSON.stringify({
        msg: `Server is started at: ${PORT}`
    }))
})

/**
 * @author Faisal Siddiqui
 * @description This function will close node http server,
 * mongoose connection and process will exit with code.
 * default exit code is set to ZERO
 */
const gracefulHandler = (exitCode = 0) => {
    server.close(async (code = exitCode) => {
        console.log(JSON.stringify({
            message: messages.SUCCESS.serviceStopped
        }))
        mongoose.connection.close()
        console.log(JSON.stringify({
            message: messages.SUCCESS.mongooseDisconnect
        }))
        process.exit(code)
    })
}

/**
 * @author Faisal Siddiqui
 * @description Process will handle exception, rejection, warning and sigint
 * signals of Node
 */
process
    .on("uncaughtException", err => {
        console.error(JSON.stringify({
            message: `Uncaught Exception. Exiting. Error: ${err} Stack: ${err.stack}`
        }))
        gracefulHandler(1)
    })
    .on("unhandledRejection", (reason, promise) => {
        console.error(JSON.stringify({
            message: `Unhandled Rejection at ${promise} . Exiting. ${reason}`
        }))
        gracefulHandler(1)
    })
    .on("warning", warning => {
        console.warn(JSON.stringify({
            message: `Warning: ${warning.name} ${warning.message} ${warning.stack}`
        }))
    })
    .on("SIGINT", () => {
        console.log(JSON.stringify({
            message: messages.ERROR.sigint
        }))
        gracefulHandler(0)
    })
module.exports = app