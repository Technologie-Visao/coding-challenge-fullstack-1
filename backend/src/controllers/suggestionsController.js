const database = require('../utils/database')

/**
 * Search suggestions
 * @param {Request} req
 * @param {Response} res
 */
function searchSuggestions(req, res) {
  // query parameters
  const { limit } = req.query
  // get data
  const data = database.getAll({ limit })
  res.send(data)
}

module.exports = { searchSuggestions }
