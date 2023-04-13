const { data } = require('./data')

// helper methods to mimic database methods such as .findById()

/**
 * Get all suggestions
 * @param {{limit: number}} options
 * @returns {[]} suggestions
 */
function getAll({ limit } = {}) {
  if (!limit) return data
  return data.slice(0, limit)
}

const database = { getAll }
module.exports = database
