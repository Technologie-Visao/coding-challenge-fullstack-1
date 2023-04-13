const express = require('express')
const { searchSuggestions } = require('../controllers/suggestionsController')

const router = express.Router()

router.get('/', searchSuggestions)

module.exports = router
