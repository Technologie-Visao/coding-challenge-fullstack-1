const express = require('express')
const suggestionsRouter = require('./routes/suggestions')

// init
const app = express()

// routes
app.get('/', (req, res) => {
  res.send('Hello there!')
})
app.use('/textures/suggestions', suggestionsRouter)

module.exports = app
