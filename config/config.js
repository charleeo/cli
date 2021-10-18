require('dotenv').config();
const mysql = require('mysql2')

const config = {
    db:{
        DB_PASSWORD :process.env.DB_PASSWORD,
        DB_USER : process.env.DB_USER,
        DB_DATABASE : process.env.DB_DATABASE,
        DB_HOST : process.env.DB_HOST,
        PORT : process.env.PORT || 8000,
        connectionLimits  : process.env.MYSQL_CONNECTION_LIMITS,

    },
    listPerPage: env.LIST_PER_PAGE || 10,
}

module.exports= config