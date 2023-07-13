const conectMongoDB = require('./src/config/db')
const app = require('express')()
const dotenv = require('dotenv').config()
const colors = require('colors')
const  middleware  = require('./src/middleware/presetMiddleware')
const { notFoundHandellar, globalErrorHandellar } = require('./src/middleware/errorHandler')
const PORT = process.env.SERVER_PORT || 4000

// Global middleware set
app.use(middleware)

// GLobal error handler
app.use([notFoundHandellar , globalErrorHandellar])

// Connect with DB and Server listening
conectMongoDB().then((res) => {
    app.listen(PORT , () => {
        console.log(`SERVER IS LISTENNING ON PORT ${PORT}`.green)
    })        
})
.catch(err => console.log(err.message.red))


