import supertest from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Test /hello endpoint', () => {
  test('GET /hello', async () => {
    const response = await supertest(app).get('/hello');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello!');
  });
});