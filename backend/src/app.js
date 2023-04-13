const express = require('express')
const cors = require('cors')
const suggestionsRouter = require('./routes/suggestions')
const config = require('./config/config')

// init
const app = express()

// middleware
app.use(cors({ origin: config.FRONTEND_URL })) // allow requests from the frontend

// routes
app.get('/', (req, res) => {
  res.send('Hello there!')
})
app.use('/textures/suggestions', suggestionsRouter)

module.exports = app
