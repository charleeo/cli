const connection = require('../config/raw_connection')
const Query = require('../queries/Queries')

class BaseModel{
    constructor(model, primaryKey, fields ={}){
     this.model = model
     this.mysql  = connection.mysqlConnection()
     this.fields=fields
     this.primaryKey=primaryKey
    }
    // static mysql = connection.mysqlConnection()
    // static model = this.model
    /**
     * 
     * @param {*} column 
     * @returns rows of records  or null
     */
     async fetchAll(column=["*"]){
     
        try {
            let columns = column.toString()
            const [rows,fields] = await this.mysql.query(`SELECT ${columns} FROM ${this.model}`)
            return rows;
            
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 
     * @param {*} column 
     * @param {*} firstCondition 
     * @param {*} secondColumn 
     * @param {*} columns 
     * @returns A single if condtion is met and null if condition is n ot met
     */
    async  findOne(column, firstCondition,  columns=["*"]){
        try {
            const [row,fields] = await this.mysql.query(
                Query.findOne(this.model,columns, column),
                [firstCondition]
                )
           return row;
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * 
     * @param {*} id 
     * @param {*} columns 
     * @returns  a  sing le row of the primary key supplied  or null
     */
    async  findById(id, columns=["*"]){
        
        try {
            const [row,fields] = await this.mysql.query(
                Query.findById(this.model,this.primaryKey,columns),
                [id]
                )
           return row;
        } catch (err) {
            console.log(err)
        }
    }

    async create(data){
         try {
             
           const [result,fields] =  await this.mysql.query(Query.create(this.model,{}),data)
        //    return the record that was just created
          const lastInsertedId = result.insertId
          const rows = this.findById(lastInsertedId)
           return rows;
         } catch (err) {
          console.log(err)   
         }
        }
        
        async update(data,column,condition){
            try {
                
             await this.mysql.query(Query.update(this.model,column),[data,condition])
             return await this.findOne(column,condition) //record that was just updated
            } catch (err) {
            console.log(err)   
            }
      
    }
}

module.exports= BaseModel