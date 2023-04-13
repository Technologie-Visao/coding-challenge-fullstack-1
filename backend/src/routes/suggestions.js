const express = require('express')
const { data } = require('../utils/data')

const router = express.Router()

router.get('/', (req, res) => {
  res.send(data)
})

module.exports = router
