const models = require('../../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const secrete = require('../../config/config').jwt_secrete
const port = require('../../config/config').PORT
const mailObject = require('../../helpers/helpers')
const {emailVerificationObject,forgotPasswordObjects }  = require( '../../helpers/mailObjects')
const {text,html,subject} = emailVerificationObject
const {textF,htmlF,subjectF} = forgotPasswordObjects

const UserController ={
  async getAllUsers(req,res){
    try {
      const users = await models.User.findAll({attributes:['email','name','id']});
      if(!users){
          return res.status(404).json({message:"No user is found"})
      }
      return res.status(200).json(users);
  } catch (error) {
      res.status(500).json({error})
  }
   },

  async  getAUser(req,res){
    const id = req.params.id
    try{
        const user = await models.User.findOne({where:{id}, attributes:['email','name','id','createdAt']});
        if(!user){
            return res.status(404).json({message:"No user is found with " +id})
        }
        return res.status(200).json(user)
    }catch (error) { res.status(500).json({error})  }
   },

   async registerUser(req,res){
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
  const {error,value}= schema.validate({ name,email,password});
  if(error){
    return res.status(400).json({
         error: error.details[0].message
     })
    } 

    const checkUser= await models.User.findOne({where:{email}});
    if(checkUser){
        return  res.status(409).json({error:"Email already exists!"} );
    }
    const salt = await bcryptjs.genSalt(10);
    const hash= await bcryptjs.hash(password, salt);
    const user = { name, email, password: hash }
    const token = jwt.sign({email}, secrete,{expiresIn:"2days"})
    const result =  await models.User.create(user)
    res.status(201).json({
        message: "User created successfully",
        result:result
    });
    /**Send mail to registered users */
    const url = `http://127.0.0.1:${port}/user/verify-account/${email}/${token}`
    await mailObject.sendMail(email,url,subject,text,html)
   },
   async  login(req, res){
      const {email,password}= req.body;
      try{      
      if(!email || !password){
          return res.status(400).json({
              error: "Please ensure that all fields are filled"
          })
      }
      const user = await models.User.findOne({where:{email}});
      if(user === null){
          return  res.status(400).json({error:"Invalid credential "});
      }  
      const validPassword = await bcryptjs.compare(password, user.password); 
      if(!validPassword){return res.status(400).send({error:"Invalid credentials"})}
      const token =  jwt.sign({userId: user.id, email,name:user.name},secrete,{expiresIn:'2days'});
      delete user.password
      console.log(user.password)
      res.header('auth-token', token).json({message:"Login was successfull",token,user}) 
      }catch(error){
          res.status(500).json(error)
      }
  }
}


module.exports = UserController