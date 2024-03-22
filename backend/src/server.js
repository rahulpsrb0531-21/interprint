import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'
import multer from 'multer'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config/db.js'
import Logging from './library/Logging.js'
import ClientRouter from './routes/clientRoute.js'
import AdminRouter from './routes/adminRoute.js'
import EnquiryRouter from './routes/enquiryRoute.js'
import SalesRouter from './routes/salesRoute.js'
const router = express()

/** Connect to Mongo */
mongoose.set('strictQuery', false)
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongo connected successfully.')
        StartServer()
    })
    .catch((error) => Logging.error(error))


/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`)
        });

        next()
    })

    if (process.env.NODE_ENV === 'development') {
        router.use(morgan('dev'))
    }

    //******* HIDING EXPRESS *******\\

    // Cross Origin Resource Sharing
    router.use(cors())
    router.options('*', cors())

    //******* MIDDLEWARES *******\\
    // built-in middleware for json 
    router.use(express.json())


    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));
    router.get('/favico.ico', (req, res) => {
        res.status(404)
    })

    /** Routes */
    router.use("/api/client", ClientRouter)
    router.use("/api/admin", AdminRouter)
    router.use("/api/enquiry", EnquiryRouter)
    router.use("/api/sales", SalesRouter)

    router.listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`))
};