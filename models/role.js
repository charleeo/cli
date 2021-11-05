'use strict';

const BaseModel = require("./BaseModel");

class Role extends BaseModel{
    constructor(model,primaryKey){
    super(model,primaryKey)
    this.model = "roles"
    this.primaryKey = "role_id"
  }
}

module.exports=Role