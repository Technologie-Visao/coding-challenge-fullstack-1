const database = require('../utils/database')

/**
 * Search suggestions
 * @param {Request} req
 * @param {Response} res
 */
function searchSuggestions(req, res) {
  // query parameters
  const { limit, search } = req.query
  // get data
  const data = database.getAll({ limit, search })
  res.send(data)
}

module.exports = { searchSuggestions }
