const express = require('express');
const userRoutes = require('./routes/userRoutes')

const api = express()
api.use(express.json())

api.use('/users/',userRoutes)

module.exports = api

