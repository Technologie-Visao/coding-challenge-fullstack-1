const express = require('express')
const suggestionsRouter = require('./routes/suggestions')
const { data } = require('./utils/data')

// init
const app = express()

// routes
app.get('/', (req, res) => {
  res.send(data)
})

app.use('/textures/suggestions', suggestionsRouter)

module.exports = app
