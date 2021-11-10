const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const secrete = require('../../config/config').jwt_secrete
const {getCurrentDate,sendMail} = require('../../helpers/helpers')
const logUtils = require('../../logutils')
const RestuarantOperator = require('../../models/restaurantoperator');

const {emailVerificationObject,forgotPasswordObjects }  = require( '../../helpers/mailObjects');
const LogUtils = require('../../logutils');
const RestuarantOperatorObject = new RestuarantOperator()

const {text,html,subject} = emailVerificationObject

const {textF,htmlF,subjectF} = forgotPasswordObjects

const RestuarantOperatorController ={
    async createRestuarant(req,res){
        let  status  = false;
        let statusCode = 201
        let responseData = null;
        let message = ""
        let result =null
        error = null
        
        const {name,email,password,role_id} = req.body
         const schema = Joi.object({
          name: Joi.string()
              .min(3)
              .max(30)
              .alphanum()
              .required(),
          password: Joi.string().required()
              .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6),
          email: Joi.string() .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','info','ng'] } }).required()
      })
      try {
          const {error}= schema.validate({ name,email,password});
          
          const checkUser = await RestuarantOperatorObject.findOne({email});
        
          if(error){
                message = error.details[0].message
                statusCode  = 400
            } 
        
            else if(checkUser.length >0){
                statusCode = 409
                message = `User with this ${email} already exists`
            }else{
            const salt = await bcryptjs.genSalt(10);
            const hash= await bcryptjs.hash(password, salt);
            const date = getCurrentDate()
            const user = { name, email, password: hash, role_id, createdAt:date,updatedAt:date}
            result =  await RestuarantOperatorObject.create(user)
            if(result){
                responseData = result
                message = "Account created successfully"
                status = true
            }else message="Could not create a user"
        }
        
        } catch (err) {
            message = "There  is a server error"
            statusCode = 500
            res.status(statusCode)
            LogUtils.logErrors(err)
            error = err.message 
        }
        logUtils.logData(error? error:responseData,req,res,message,statusCode,status)
        res.status(statusCode).json({ status, responseData, message })
       },

       
}


module.exports = RestuarantOperatorController