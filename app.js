const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql')
const pool = require('./main')
require('dotenv').config()



const app = express()

const port = process.env.PORT || 5000

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.listen(port,()=> console.log(`Listening on Port ${port}`))

app.get('', (req,res) =>{
    pool.getConnection((err,connection)=>{
    if(err) console.error(err)
    let query = "SELECT * FROM users"
    connection.query(query,(err,rows)=>{
        connection.release()
      if(!err){
          res.send(rows)
      }else{
          res.send(err)
      }
    })    
})
})

