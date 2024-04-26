import supertest from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Test /subtract endpoint', () => {
  test('GET /subtract with valid parameters', async () => {
    const response = await supertest(app).get('/subtract?a=10&b=5');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Difference: 5');
  });

  test('GET /subtract with invalid parameters', async () => {
    const response = await supertest(app).get('/subtract?a=ten&b=five');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Non-numerical input');
  });
});