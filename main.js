const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
  connectionLimit:20,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})


// const user = { name: 'Craig Buckler', email: 'email@email.com',password:"1234567890" };
// connection.query('INSERT INTO users SET ?', user, (err, res) => {
//   if(err) throw err;

//   console.log('Last insert ID:', res.insertId);
// });

// connection.query(
//     'UPDATE users SET name = ? Where ID = ?',
//     ['Michael Jackson', 2],
//     (err, result) => {
//       if (err) throw err;
  
//       console.log(`Changed ${result.changedRows} row(s)`);
//     }
//   );


// connection.query('SELECT * FROM users', (err,rows) => {
//     if(err) throw err;
  
//     console.log('Data received from Db:');
//     console.log(rows);
//   });
  
module.exports = pool
// connection.end(err=>{
//     err? console.error(err): console.info('connection terminated')
// })