const connection = require('../config/raw_connection')

class BaseModel{
    constructor(table){
     this.table = table
     console.log(this.table)
    }
    async fetchAll(column=["*"]){

        try {
           let mysql = connection.mysqlConnection()
            let columns = column.toString()
            console.log("Table is here"+this.table)
            const [rows,fields] = await mysql.query(`SELECT ${columns} FROM ${this.table}`)
            return rows;
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports= BaseModel