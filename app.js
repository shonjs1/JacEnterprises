const express = require('express')
const app = express()
const userRouter = require('./routes/users')

app.set("view engine", "ejs")
app.use(logger)

app.use('users', userRouter)

function logger(req, res, next) {
    console.log(reqOriginalUrl)
    next()
}


app.listen(9005)