const express = require('express')
const School = require('../../http/controllers/SchoolController')
const authMiddleWare = require("../../middleware/auth_middleware")

const router = express.Router()

router.post('/save', School.create)


module.exports = router;