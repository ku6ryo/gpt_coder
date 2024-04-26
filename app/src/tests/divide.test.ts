import supertest from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Test /divide endpoint', () => {
  test('GET /divide with valid parameters and non-zero divisor', async () => {
    const response = await supertest(app).get('/divide?a=10&b=2');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Quotient: 5');
  });

  test('GET /divide with zero divisor', async () => {
    const response = await supertest(app).get('/divide?a=10&b=0');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Division by zero error');
  });

  test('GET /divide with non-numerical input', async () => {
    const response = await supertest(app).get('/divide?a=ten&b=five');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Non-numerical input');
  });
});