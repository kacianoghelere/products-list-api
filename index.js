require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 8000

global.__basedir = __dirname

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./app/controllers')(app)

app.listen(port, () => console.log(`The API is listening on port ${port}!`))
