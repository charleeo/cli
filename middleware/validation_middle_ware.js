// const { body } = require('express-validator/check')

// exports. validate = (method) => {
//   switch (method) {
//     case 'createUser': {
//      return [ 
//         body('name', "name doesn't exists").exists(),
//         body('email', 'Invalid email').exists().isEmail(),
//         body('password').exists().isInt(),
//         body('status').optional().isIn(['enabled', 'disabled'])
//        ]   
//     }
//   }
// }

const { check, validationResult } = require('express-validator');

function validateInputs(req, res, next){   
     
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            res.status(400).json('Please provide a token')}
        else{
            const decodedToken = jwt.verify(token,config.jwt_secrete);
            req.userData = decodedToken;
            next();
        }
        
    } catch (error) {
        res.status(401).json(error.message)
    }

    try {

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
        
    } catch (error) {
        console.log(error)
    }
}