const bodyParser = require('body-parser')
const http = require('http')
const config = require('./config2/schema/config')
const app = require('./resources/api')
const port = config.PORT

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const server = http.createServer(app)

app.listen(port, ()=>{
    console.log(`App is listening on PORT ${port}`)
})

