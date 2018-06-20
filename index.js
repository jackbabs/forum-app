const express = require('express')
const mongoose = require('mongoose')
//const http = require('http')
const bodyParser = require('body-parser')

const app = express()


//DB setup 
mongoose.connect('mongodb://localhost:27017/auth')

app.use(bodyParser.json())

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
//const server = http.createServer(app)
//server.listen(port)
app.listen(PORT)

