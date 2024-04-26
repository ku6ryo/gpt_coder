import supertest from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Test /hello endpoint', () => {
  test('GET /hello with valid name parameter', async () => {
    const response = await supertest(app).get('/hello?name=John');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, John!');
  });

  test('GET /hello without name parameter', async () => {
    const response = await supertest(app).get('/hello');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Name parameter is required.');
  });
});