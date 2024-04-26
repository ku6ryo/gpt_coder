import supertest from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Test /multiply endpoint', () => {
  test('GET /multiply with valid parameters', async () => {
    const response = await supertest(app).get('/multiply?a=10&b=5');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Product: 50');
  });

  test('GET /multiply with invalid parameters', async () => {
    const response = await supertest(app).get('/multiply?a=ten&b=five');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Non-numerical input');
  });
});