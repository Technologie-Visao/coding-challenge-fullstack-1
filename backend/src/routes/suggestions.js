const express = require('express')
const { searchSuggestions } = require('../controllers/suggestionsController')

const router = express.Router()

// routes
router.get('/', searchSuggestions)

module.exports = router
