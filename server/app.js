const express = require('express')
const cors = require('cors')
const error = require('./middleware/error')
const routes = require('./routes')

const app = express()
app.use('/static', express.static('static'))
app.use(cors())
app.use(express.json())
app.use('/api', routes)
app.use(error)

module.exports = app
