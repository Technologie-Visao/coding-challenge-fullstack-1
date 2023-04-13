const database = require('../utils/database')

/**
 * Search suggestions
 * @param {Request} req
 * @param {Response} res
 */
function searchSuggestions(req, res) {
  const { limit } = req.query
  const data = database.getAll({ limit })
  res.send(data)
}

module.exports = { searchSuggestions }
