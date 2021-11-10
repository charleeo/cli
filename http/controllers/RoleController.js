
const LogUtils = require('../../logutils')
const logUtils = require('../../logutils')
const Role = require('../../models/role')
const RoleObject = new Role()


const RoleController ={
    create: async(req,res)=>{
        let status = false
        let message=''
        let error = null;
        let responseData=null;
        let  statusCode=200
        const {role_name} = req.body

        try {
            const [role] = await RoleObject.findOne({role_name})
    
            if(!role_name){
                 message = "Role name field is require"
            }else if(role){
              message = `There is role with this name ${role_name}`
            }
            else{
                const role  = await RoleObject.create(
                    {
                        'role_name' :role_name
                    }
                )
                
                if(role.length >0){
                    message="Role Created"
                    responseData = role
                    status = true 
                    statusCode=201
                }
                else {
                    message ="Unable to create role"   
                    status = true
                }         

            }
        }catch (err) {
            message = "There  is a server error"
            statusCode = 500
            res.status(statusCode)
            error = new Error(err)
            LogUtils.logErrors(err)
        }
    
        logUtils.logData(error? error:responseData,req,res,message,statusCode,status)
        res.status(statusCode).json({ status, responseData, message })
    }
  
}


module.exports = RoleController