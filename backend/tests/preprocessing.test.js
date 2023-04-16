const { preprocess, tokenize } = require('../src/utils/preprocessing')

describe('Preprocessing', () => {
  test('removes punctuation', () => {
    expect(preprocess('How are you?')).toBe('how are you')
  })

  test('handles any amount of whitespace', () => {
    expect(
      tokenize(preprocess(' creature  from a   barren  planet   '))
    ).toEqual(['creature', 'barren', 'planet'])
  })

  test('handles empty strings', () => {
    expect(tokenize('')).toEqual([])
  })

  test('removes duplicates', () => {
    expect(tokenize('tree tree tree')).toEqual(['tree'])
  })
})
