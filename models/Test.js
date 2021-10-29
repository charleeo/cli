const BaseModel = require("./BaseModel");


class Test extends BaseModel{
    constructor(){
        super(table)
        table = 'users'
        console.log(this.table)
    }

}

module.exports = Test