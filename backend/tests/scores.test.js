const {
  wordsMatch,
  quantifyMatch,
  quantifyMatches,
  scoreSearch,
} = require('../src/utils/scores')

/**
 * Test how searches are scored
 */
describe('Scores', () => {
  test('words match', () => {
    expect(wordsMatch('word', 'word')).toBe(1)
    expect(wordsMatch('word', 'rd')).toBe(0.1)
    expect(wordsMatch('word', 'random')).toBe(0)
  })

  test('quantify match', () => {
    expect(quantifyMatch('aurora', 'aurora')).toBe(1)
    expect(quantifyMatch('aurora', 'aur')).toBeLessThan(1)
  })

  test('quantify matches', () => {
    expect(quantifyMatches('dark matter', 'dark')).toBe(0.5)
    expect(quantifyMatches('dark matter', 'matter')).toBe(0.5)
    expect(quantifyMatches('dark matter', 'dark matter')).toBe(1)
  })

  test('score search', () => {
    const suggestion = { name: 'Aurora', description: '' }
    expect(scoreSearch(suggestion, '')).toBe(0)
    expect(scoreSearch(suggestion, 'aurora')).toBe(10)
  })
})
