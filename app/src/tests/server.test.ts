import request from 'supertest';
import { app } from '../server';

describe('Test API Endpoints', () => {
  test('GET /hello endpoint', async () => {
    const response = await request(app).get('/hello');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello!');
  });

  test('GET /sum endpoint with valid parameters', async () => {
    const response = await request(app).get('/sum?a=10&b=5');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Sum: 15');
  });

  test('GET /subtract endpoint with valid parameters', async () => {
    const response = await request(app).get('/subtract?a=10&b=5');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Difference: 5');
  });
});