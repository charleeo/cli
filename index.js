const http = require('http')
const config = require('./config/config')
const app = require('./resources/app')
const port = config.PORT

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`App is listening on PORT ${port}`)
})

