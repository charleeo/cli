const express = require('express')
const RoleController = require('../../http/controllers/RoleController')
const UserController = require('../../http/controllers/UserController')
const authMiddleWare = require("../../middleware/auth_middleware")

const router = express.Router()

router.get('', UserController.getAllUsers)
router.get('/:id', authMiddleWare.checkAuth,  UserController.getAUser)
router.post('/save', UserController.registerUser)
router.post('/update/:id', UserController.updateUsers)
router.post('/login', UserController.login)
router.post('/get', UserController.getUser)
router.post('/create-roles', RoleController.create)

module.exports = router;