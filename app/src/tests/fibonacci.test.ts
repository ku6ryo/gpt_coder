import supertest from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Test /fibonacci endpoint', () => {
  test('GET /fibonacci with valid input', async () => {
    const response = await supertest(app).get('/fibonacci?n=10');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: 55 });
  });

  test('GET /fibonacci with invalid input', async () => {
    const response = await supertest(app).get('/fibonacci?n=abc');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Invalid input, please enter a valid number.');
  });

  test('GET /fibonacci with negative input', async () => {
    const response = await supertest(app).get('/fibonacci?n=-5');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Invalid input, please enter a valid number.');
  });
});