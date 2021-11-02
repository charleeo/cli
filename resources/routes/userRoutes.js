const express = require('express')
const UserController = require('../../http/controllers/UserController')
const authMiddleWare = require("../../middleware/auth_middleware")
const { check, validationResult } = require('express-validator');
const router = express.Router()

router.get('', UserController.getAllUsers)
router.get('/:id', authMiddleWare.checkAuth,  UserController.getAUser)
router.post('/save', UserController.registerUser)
router.post('/update/:id', UserController.updateUsers)
router.post('/api',
[
    check('email', 'Email is not valid').isEmail(),
    check('username', 'Username field is required').not().isEmpty(),
    check('password', 'Password field is required').not().isEmpty()
  ],
  function(req,res){
    const errors = validationResult(req);
  if (errors) {
    console.log(errors);
    res.status(200).json({ errors: errors.array() });
  }
  else {
    console.log('No Errors');
    res.status(200).json({ message: 'Successful Registration.' });
    }
  }
)
// router.post('/login', UserController.login)

module.exports = router;