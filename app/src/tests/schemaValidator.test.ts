import supertest from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Test /validateSchema endpoint', () => {
  test('POST /validateSchema with valid schema', async () => {
    const validSchema = JSON.stringify({
      version: '0.0.1',
      structure: [{
        transform: { x: 0, y: 1.0, z: 0 },
        children: [{
          transform: { x: 2.0, y: -3.0, z: 4.0 }
        }]
      }]
    });
    const response = await supertest(app).post('/validateSchema').send(validSchema);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Schema is valid!');
  });

  test('POST /validateSchema with invalid schema', async () => {
    const invalidSchema = JSON.stringify({
      version: '',
      structure: []
    });
    const response = await supertest(app).post('/validateSchema').send(invalidSchema);
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Schema is invalid!');
  });
});