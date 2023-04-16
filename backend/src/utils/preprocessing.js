const STOP_WORDS = [
  'i',
  'me',
  'my',
  'myself',
  'we',
  'our',
  'ours',
  'ourselves',
  'you',
  'your',
  'yours',
  'yourself',
  'yourselves',
  'he',
  'him',
  'his',
  'himself',
  'she',
  'her',
  'hers',
  'herself',
  'it',
  'its',
  'itself',
  'they',
  'them',
  'their',
  'theirs',
  'themselves',
  'what',
  'which',
  'who',
  'whom',
  'this',
  'that',
  'these',
  'those',
  'am',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'having',
  'do',
  'does',
  'did',
  'doing',
  'a',
  'an',
  'the',
  'and',
  'but',
  'if',
  'or',
  'because',
  'as',
  'until',
  'while',
  'of',
  'at',
  'by',
  'for',
  'with',
  'about',
  'against',
  'between',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'to',
  'from',
  'up',
  'down',
  'in',
  'out',
  'on',
  'off',
  'over',
  'under',
  'again',
  'further',
  'then',
  'once',
  'here',
  'there',
  'when',
  'where',
  'why',
  'how',
  'all',
  'any',
  'both',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'nor',
  'not',
  'only',
  'own',
  'same',
  'so',
  'than',
  'too',
  'very',
  's',
  't',
  'can',
  'will',
  'just',
  'don',
  'should',
  'now',
]

/**
 * Preprocess text
 * @param {string} text
 */
function preprocess(text) {
  // trim to avoid 'test '.split(' ') => [ 'test', '' ]
  text = text.toLowerCase().trim()
  // remove punctuation
  text = text.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '')
  return text
}

/**
 * Split text into words
 * @param {string} text
 * @returns {[]}
 */
function tokenize(text, removeStopWords = true, removeDuplicates = true) {
  if (text === '') return []
  // split into words with any whitespace
  let words = text.split(/\s+/)
  // remove stop words
  if (removeStopWords) {
    words = words.filter((word) => !STOP_WORDS.includes(word))
  }

  // remove duplicate words
  if (removeDuplicates) {
    words = [...new Set(words)]
  }
  return words
}

module.exports = { preprocess, tokenize }
