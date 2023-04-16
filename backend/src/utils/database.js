// abstraction layer to be able to change the underlying database

const { data } = require('./data')
const { scoreSearch } = require('./scores')

// helper methods
function limitSuggestions(suggestions, limit) {
  return suggestions.slice(0, limit)
}

/**
 *
 * @param {[]} suggestions
 * @param {string} search
 * @returns {[]}
 */
function searchSuggestions(suggestions, search) {
  // add score
  const results = suggestions.map((suggestion) => ({
    ...suggestion,
    score: scoreSearch(suggestion, search),
  }))
  // order by score
  results.sort((a, b) => b.score - a.score)

  // remove results with low scores
  return results.filter((suggestion) => suggestion.score > 0)
}

/**
 * Get all suggestions
 * @param {{limit: number, search: string}} options
 * @returns {[]} suggestions
 */
function getAll({ limit, search } = {}) {
  let results = data
  // empty array for empty search
  if (search === '') return []
  // search suggestions
  else if (search) results = searchSuggestions(results, search)

  // limit number of returned suggestions
  if (limit) results = limitSuggestions(results, limit)
  return results
}

// export
const database = { getAll }
module.exports = database
