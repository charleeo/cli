const express = require('express');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')

const api = express()
api.use(express.json())
api.use(bodyParser.json({limit: '200mb'}));
api.use(bodyParser.urlencoded({limit: '200mb', extended: false}));

api.use('/users/',userRoutes)

module.exports = api

