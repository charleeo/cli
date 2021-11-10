const BaseModel = require("./BaseModel");


class Test extends BaseModel{
    constructor(model,primaryKey){
        super(model,primaryKey)
        this.model = "users"
        this.primaryKey = "id"
    }
  
}
module.exports = Test