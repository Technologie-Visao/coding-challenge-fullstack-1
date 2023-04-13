// helper methods to mimic database methods such as .findById()

const { data } = require('./data')

/**
 * Get all suggestions
 * @param {{limit: number}} options
 * @returns {[]} suggestions
 */
function getAll({ limit } = {}) {
  if (!limit) return data
  return data.slice(0, limit)
}

// export
const database = { getAll }
module.exports = database
