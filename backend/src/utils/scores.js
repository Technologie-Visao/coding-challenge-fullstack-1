const { tokenize, preprocess } = require('./preprocessing')

/**
 * Whether a search query matches a word
 * @param {string} word
 * @param {string} search
 * @returns {number} number between 0 and 1
 */
function wordsMatch(word, search) {
  const startIndex = word.indexOf(search)
  // perfect match if the search matches with the start of the word
  if (startIndex === 0) {
    return 1
  }
  // reward matches that are not at the start less
  else if (startIndex > 0) {
    return 0.1
  } else {
    // no matches were found
    return 0
  }
}

/**
 * Same as wordsMatch, but takes into account the length of the words
 * @param {string} word
 * @param {string} search
 * @returns {number}
 */
function quantifyMatch(word, search) {
  // reward "aurora" more than "aur"
  let ratio = 1
  if (search.length <= word.length && word !== '') {
    // avoid division by 0 in case word is an empty string
    // if the search is longer than the word, there won't be a match so it doesn't make sense to calculate the ratio
    ratio = search.length / word.length
  }
  return wordsMatch(word, search) * ratio
}

/**
 * Text and searchQuery may contain multiple words
 * @param {string} text
 * @param {string} searchQuery
 * @returns {number}
 */
function quantifyMatches(text, searchQuery) {
  // split searchQuery and text into words
  const searchWords = tokenize(preprocess(searchQuery), false) // (optional) don't remove words from user input
  const words = tokenize(preprocess(text))

  // avoid division by 0
  if (words.length === 0) return 0

  // accumulate score
  let score = 0
  for (const searchWord of searchWords) {
    // compare words one by one
    for (const word of words) {
      score += quantifyMatch(word, searchWord)
    }
  }

  // normalize score
  // I decided to not divide by searchWords.length so that "dark matter" is rewarded more than "dark" or "matter" alone
  return score / words.length
}

/**
 * Score search query against a suggestion
 * @param {{name: string, description: string}} suggestion
 * @param {string} search
 * @returns {number}
 */
function scoreSearch(suggestion, search) {
  // the name field is the most important
  const nameScore = quantifyMatches(suggestion.name, search) * 10
  // give less importance to description
  // keep in mind that longer descriptions will result in lower scores
  const descriptionScore = quantifyMatches(suggestion.description, search) * 5
  return nameScore + descriptionScore
}

module.exports = { wordsMatch, quantifyMatch, quantifyMatches, scoreSearch }
