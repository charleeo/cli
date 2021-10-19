const express = require('express')
const UserController = require('../../http/controllers/UserController')

const router = express.Router()

router.get('', UserController.getAllUsers)
router.get('/user/:id', UserController.getAUser)
router.post('/save', UserController.registerUser)
router.post('/login', UserController.login)

module.exports = router;