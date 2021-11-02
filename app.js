const bodyParser = require('body-parser')
const http = require('http')
const config = require('./config2/schema/config')
const app = require('./resources/app')
const port = config.PORT

// app.use(bodyParser.urlencoded({extended:false}))
pp.use(express.urlencoded())
// app.use(bodyParser.json())
app.use(express.json())

const server = http.createServer(app)

app.listen(port, ()=>{
    console.log(`App is listening on PORT ${port}`)
})

