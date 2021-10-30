const BaseModel = require("./BaseModel");


class Test extends BaseModel{
    constructor(model,primaryKey){
        super(model,primaryKey)
        this.model = "users"
        this.primaryKey = "id"
    }

    // getFields(fields){
    //     return{
    //         name:  fields.name,
    //         emil:  fields.email,
    //         password:  fields.password,
    //         role_id:  fields.role_id
    //     }
    // }
  
}
module.exports = Test