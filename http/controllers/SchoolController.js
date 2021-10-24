const models = require('../../models');
const Joi = require('joi')
const config = require('../../config/config')
const {generateToken} = require('../../helpers/helpers')
const logUtils = require('../../logutils')

const School= {
  async  create  (req, res){
        let  status  = false;
        let statusCode = 200
        let responseData = null;
        let message = ""
        let school = null
        let error = null
        try {
            const {
                school_name,school_email,school_phone, school_logo, school_motto, school_owner_id,school_address
            } = req.body
            
           const  guidCheck = await models.School.findOne({limit:1,
            order:[['createdAt','DESC']], attributes:["school_GUID"]})
            if(guidCheck){ 
                const schoolGuid = guidCheck.school_GUID
                guid = generateToken(schoolGuid)
            }else{
                guid = generateToken(0)
            }
        
           const schoolData = {school_name,school_email,school_phone, school_logo, school_motto, school_owner_id,school_address,school_GUID:guid}
           school =  await models.School.create(schoolData)
           if(school){
               responseData = school
               message = "School saved"
               statusCode=201
               status = true
           }else{
               message = "Could not create record. Please retry"
           }
            
        } catch (err) {
            error = err.message
            message="There is a server error"
            statusCode=500
        }
        logUtils.logData(error? error:responseData,req,res,message,statusCode,status)
        res.status(statusCode).json({ status, responseData, message })
    }
}

module.exports=School