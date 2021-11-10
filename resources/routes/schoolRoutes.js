const express = require('express')
const School = require('../../http/controllers/SchoolController')
const router = express.Router()

router.post('/save', School.create)


module.exports = router;