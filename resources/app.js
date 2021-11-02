const express = require('express');
const userRoutes = require('./routes/userRoutes')
const schoolRoutes = require('./routes/schoolRoutes')
const expressValidator = require('express-validator')

const app = express()
app.use(express.json())


app.use('/users/',userRoutes)
app.use('/school/',schoolRoutes)


module.exports = app

