import supertest from 'supertest';
import { createApp } from '../server';
import path from 'path';

const app = createApp();

describe('Test /upload endpoint', () => {
  test('POST /upload with image upload', async () => {
    const response = await supertest(app)
      .post('/upload')
      .attach('image', path.join(__dirname, './fixtures/upload_test.jpg'))
      .expect('Content-Type', /json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('width');
    expect(response.body).toHaveProperty('height');
    expect(response.body.width).toBe(400);
    expect(response.body.height).toBe(600);
  });

  test('POST /upload without image', async () => {
    const response = await supertest(app)
      .post('/upload')
      .expect(400);
    expect(response.text).toBe('No file uploaded.');
  });
});