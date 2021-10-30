const express = require('express')
const UserController = require('../../http/controllers/UserController')
const authMiddleWare = require("../../middleware/auth_middleware")

const router = express.Router()

router.get('', UserController.getAllUsers)
router.get('/:id', UserController.getAUser)
router.post('/save', UserController.registerUser)
router.post('/update/:id', UserController.updateUsers)
// router.post('/login', UserController.login)

module.exports = router;