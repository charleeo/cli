const mysql = require('mysql2')
require('dotenv').config()
const  config = require('./config')

module.exports={
      mysqlConnection(){
      let connectionObject = {
        connectionLimit:process.env.MYSQL_CONNECTION_LIMITS,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.MYSQLPORT
      }
      const pool = mysql.createPool(connectionObject)
      const promisePool = pool.promise()
      return promisePool
    }
}

