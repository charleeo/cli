const mysql = require('mysql2/promise')
const config = require('./config/config')
const query  = require('./get_query')

const pool = mysql.createPool({
    connectionLimit : config.connectionLimits,
    host :config.DB_HOST,
    user            : config.DB_USER,
    password        : config.DB_PASSWORD,
    database        : config.DB_DATABASE,
    // rowsAsArray: true
})

// const promisePool = pool.promise();

async function getRecords(tableName) {
    try {
        const query = `SELECT * FROM ${tableName} LIMIT 1;`;
      const [users,] =  await  pool.execute(query);
    // const [rows,fields] = await promisePool.query(`SELECT * FROM ${tableName} limit 1`);
        return users;
    } catch (err) {
        
        return "false";
    }
}

let users =  getRecords('users')
console.log(users)