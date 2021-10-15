const program = require('commander')
const wr = require('./fs-module')
program
 .command('write:text <file> <con>')
.alias('w').description('Test the commander').action(function(file,con){
    return wr(file,con)
})

program.parse(process.argv)
// wr("test.js","var a = people");

