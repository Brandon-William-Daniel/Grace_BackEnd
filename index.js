require("dotenv").config('./env');
const express = require("express")
const morgan = require("morgan")
const apiRouter = require('./api')




const app = express();

const client  = require("./db/client")
app.use(morgan("dev"));

client.connect()
app.use(express.json())
app.use((req, res, next) => {
    console.log('--------------------')
    console.log ('This is the body', req.body)
    console.log('--------------------')
    next()
})





const port = 1337;
app.listen(port, ()=> {
    console.log(`SKYNET operating on PORT ${port}`)
})

app.use('/api', apiRouter)