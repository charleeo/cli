const models = require('../../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const secrete = require('../../config/config').jwt_secrete
const port = require('../../config/config').PORT
const mailObject = require('../../helpers/helpers')
const logUtils = require('../../logutils')
const {emailVerificationObject,forgotPasswordObjects }  = require( '../../helpers/mailObjects');
const {text,html,subject} = emailVerificationObject
const {textF,htmlF,subjectF} = forgotPasswordObjects

const UserController ={
        async getAllUsers(req,res){
          let  status  = false;
          let statusCode = 200
          let responseData = null;
          let message = ""
          let error =null
            try {
            const users = await models.User.findAll({attributes:['email','name','id']});
            if(users){
                status = true
                message = "Records fetched"
                responseData = users
            }else message="No record found"
        } catch (err) {
            message = "There  is a server error"
            statusCode = 500
            error = err.message 
        }
        logUtils.logData(error? error:responseData,req,res,message,statusCode,status)
        res.status(statusCode).json({ status, responseData, message })
    },
    
    async getAUser(req,res){
        const id = req.params.id
        let  status  = false;
        let statusCode = 200
        let responseData = null;
        let message = ""
        let error =null
        try{
            const user = await models.User.findOne({where:{id}, attributes:['email','name','id','createdAt']});
            if(user){
                message="User found"
                responseData = user
                status = true 
            }
            else {
                message ="No user is found with this ID " +id   
                statusCode=404
            }         
        }catch (err) {
            message = "There  is a server error"
            statusCode = 500
            error = err.message 
        }
        
        logUtils.logData(error? error:responseData,req,res,message,statusCode,status)
        res.status(statusCode).json({ status, responseData, message })
    },

   async registerUser(req,res){
    let  status  = false;
    let statusCode = 201
    let responseData = null;
    let message = ""
    let result =null
    error = null
    
    const {name,email,password} = req.body
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
      const {error,value}= schema.validate({ name,email,password});
      const checkUser= await models.User.findOne({where:{email}});
     
      if(error){
            message = error.details[0].message
            statusCode  = 400
        } 
    
        else if(checkUser){
            statusCode = 409
            message = `User with this ${email} already exists`
        }else{
        const salt = await bcryptjs.genSalt(10);
        const hash= await bcryptjs.hash(password, salt);
        const user = { name, email, password: hash }
        result =  await models.User.create(user)
        if(result){
            responseData = result
            message = "Account created successfully"
            status = true
        }else message="Could create a user"
    }
    
    } catch (err) {
        message = "There  is a server error"
        statusCode = 500
        error = err.message 
    }
    logUtils.logData(error? error:responseData,req,res,message,statusCode,status)
    const token = jwt.sign({email}, secrete,{expiresIn:"2days"})
    const url = `http://127.0.0.1:${port}/user/verify-account/${email}/${token}`
    res.status(statusCode).json({ status, responseData, message })
    /**Send mail to registered users  */
    if(result) await mailObject.sendMail(email,url,subject,text,html)
   },


   async  login(req, res){
    let  status  = false;
    let statusCode = 201
    let responseData = null;
    let message = ""
    error = null
      const {email,password}= req.body;
      try{      
      if(!email || !password){
           stat=400
           message= "Please ensure that all fields are filled"
      }

      const user = await models.User.findOne({where:{email}});
      if(user === null){
          statusCode =400
          message="Invalid credential ";
      }  
      const validPassword = await bcryptjs.compare(password, user.password); 
      if(!validPassword){
          statusCode=400
          message="Invalid credentials"
     }
     if(!message){
         const token =  jwt.sign({userId: user.id, email,name:user.name},secrete,{expiresIn:'2days'});
         message="Login was successfull"
         status = true
         responseData = {token:token,user:{email:user.email,name:user.name,id:user.id}}
     }else{
        message=message
        statusCode= statusCode 
     }
      
      }catch(err){
          statusCode= 500
          error=err.message
          message="There is a server error"
      }
      logUtils.logData(error? error:responseData,req,res,message,statusCode,status)
      res.status(statusCode).json({ status, responseData, message })
  }
}


module.exports = UserController