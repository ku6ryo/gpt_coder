import supertest from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Test /sum endpoint', () => {
  test('GET /sum with valid parameters', async () => {
    const response = await supertest(app).get('/sum?a=10&b=5');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Sum: 15');
  });

  test('GET /sum with invalid parameters', async () => {
    const response = await supertest(app).get('/sum?a=ten&b=five');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Non-numerical input');
  });
});