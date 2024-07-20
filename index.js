require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.APP_PORT 
const displayRoutes = require('express-routemap')
const userRouter = require('./routes/users')
const articleRouter = require('./routes/articles')
const categoryRouter = require('./routes/categories')
const mysqlConnection = require('./config/sql')


app.use(express.json())
app.use('/api/v1/',userRouter)
app.use('/api/v1/',categoryRouter)
app.use('/api/v1/',articleRouter)




mysqlConnection.connect((error)=>{
    if(error){
        console.log('not connected')
    }else{
        console.log('connected')
        app.listen(port, ()=>{
            displayRoutes(app)
        console.log(`listening to port ${port}`)
        })
    }
})



