'use strict';

const BaseModel = require("./BaseModel");

class RestuarantOperator extends BaseModel{
    constructor(model,primaryKey){
    super(model,primaryKey)
    this.model = "restuarant_operators"
    this.primaryKey = "restuarant_operator_id"
  }
}

module.exports=RestuarantOperator