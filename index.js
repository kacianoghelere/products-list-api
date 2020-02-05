require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

global.__basedir = __dirname

const { authenticateJWT } = require('./app/middlewares')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(authenticateJWT)

require('./app/controllers')(app)

const port = 8000

app.listen(port, () => console.log(`The API is listening on port ${port}!`))
