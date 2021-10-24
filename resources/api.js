const express = require('express');
const userRoutes = require('./routes/userRoutes')
const schoolRoutes = require('./routes/schoolRoutes')

const api = express()
api.use(express.json())

api.use('/users/',userRoutes)
api.use('/school/',schoolRoutes)

module.exports = api

