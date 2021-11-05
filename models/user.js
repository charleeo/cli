'use strict';
const BaseModel = require("./BaseModel");


class User extends BaseModel{
    constructor(model,primaryKey){
        super(model,primaryKey)
        this.model = "users"
        this.primaryKey = "id"
    }
  
}
module.exports = User