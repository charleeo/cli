const program = require('commander')
const db = require('./database/eloquents/db-connect')
// const wr = require('./fs-module')
// program
//  .command('write:text <file> <con>')
// .alias('w').description('Test the commander').action(function(file,con){
//     return wr(file,con)
// })

// program.parse(process.argv)

let getUsers = async()=>{
    const rows = await db.query(
        `SELECT * from users`,db);
        console.log(rows)
}

getUsers()


  




