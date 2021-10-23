const express = require('express')
const UserController = require('../../http/controllers/UserController')
const authMiddleWare = require("../../middleware/auth_middleware")

const router = express.Router()

router.get('', UserController.getAllUsers)
router.get('/user/:id', authMiddleWare.checkAuth, UserController.getAUser)
router.post('/save', UserController.registerUser)
router.post('/login', UserController.login)

module.exports = router;