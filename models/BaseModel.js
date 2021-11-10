const { object } = require('joi')
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
    async  findOne(column={}, columns=["*"])
    {
        try {
            const [row,fields] = await this.mysql.query(
                Query.findOne(this.model,columns, Object.keys(column)),
                [Object.values(column)]
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
    async  findById(id, columns=["*"])
    {
        
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
 
    /**
     * 
     * @param {*} data 
     * @returns create new resource and return the same to the usr
     */
    async create(data)
    {
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
        
    async update(data,column,condition)
    {
        try {
            
            await this.mysql.query(Query.update(this.model,column),[data,condition])
            return await this.findOne(column,condition) //record that was just updated
        } catch (err) {
        console.log(err)   
        }
    }

    /**
     * 
     * @param {*} fields 
     * @param {*} columns 
     */
    async findWhere(fields={},columns =['*'])
    {
        let sql =`SELECT ${columns} FROM ${this.model} WHERE `;
        let i =0;
        let keys = Object.keys(fields)
        let values = Object.values(fields)
        let condition = `AND`;
        
        for(i; i < keys.length;i++ ){
            sql += `${keys[i]} = "${values[i]}" AND `
        }
        sql = sql.substr(0,sql.length-condition.length-1)

        const [row,field] = await this.mysql.query(sql)
        return row;
    }

    async getResult(column1,column2)
    {
        return await this.findWhere(column1,column2)
    }
    
}


module.exports= BaseModel