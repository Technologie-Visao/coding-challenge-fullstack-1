import request from 'supertest';
import express from 'express';
import { searchTermRouter } from '../routes/searchTerm.router';

const app = express();
app.use(express.json());
app.use('/', searchTermRouter);

describe('searchTermRouter', () => {
  test('GET /textures/suggestions should return 200 and an array of suggestions', async () => {
    const searchTerm = 'test';
    const limit = 5;

    const response = await request(app)
      .get(`/textures/suggestions?searchTerm=${searchTerm}&limit=${limit}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeLessThanOrEqual(limit);
  });

  test('GET /textures/suggestions should return a 400 status when searchTerm is missing', async () => {
    const response = await request(app).get('/textures/suggestions?limit=5');
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(
      'searchTerm must be at least 2 characters long'
    );
  });

  test('GET /textures/suggestions should return a 400 status when limit is invalid', async () => {
    const response = await request(app).get(
      '/textures/suggestions?searchTerm=some_term&limit=-5'
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('Invalid limit parameter');
  });
});
