const request = require('supertest')
const app = require('../src/app.js')
const database = require('../src/utils/database.js')

/**
 * Test the suggestions router
 */
describe('Suggestions', () => {
  test('get all suggestions', async () => {
    const response = await request(app).get('/textures/suggestions')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(database.getAll().length)
  })

  test('get limited suggestions', async () => {
    const limit = 5
    const response = await request(app).get(
      `/textures/suggestions/?limit=${limit}`
    )
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(limit)
  })
})
