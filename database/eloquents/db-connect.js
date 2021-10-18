const mysql = require('mysql2/promise')
const config = require('../../config/config.json')
dbConfigs = {
   password: config.password,
   user: config.user,
   host: config.host,
   database: config.database,
}

async function query(sql, params) {
    const connection = await mysql.createConnection(dbConfigs);
    const [results, ] = await connection.execute(sql, params);
  
    return results;
  }
  
  module.exports = {
    query
  }



