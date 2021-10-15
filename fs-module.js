const fs = require('fs')
const migration = require('./config/schema/migarion')

const wr = (file,con)=>{
    const  path = './database/migration';
     const time = Date.now()
     let contents = migration(file,con)
     fs.writeFile(`${path}/${time}_${file}.js`,contents,(err)=>{
         if(err) { console.error(err); return}
         console.log('working')
         return;
     });
 }

 module.exports = wr