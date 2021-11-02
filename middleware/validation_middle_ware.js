const { body } = require('express-validator/check')

exports. validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('name', "name doesn't exists").exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('password').exists().isInt(),
        body('status').optional().isIn(['enabled', 'disabled'])
       ]   
    }
  }
}