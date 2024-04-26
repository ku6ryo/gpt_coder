import supertest from 'supertest';
import { createApp } from '../server';

const app = createApp();

describe('Test /download endpoint', () => {
  test('GET /download with valid file path', async () => {
    const response = await supertest(app).get('/download?f=valid_file_path.jpg');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('data');
  });

  test('GET /download with invalid or missing file path', async () => {
    const response = await supertest(app).get('/download?f=');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('File path is required');
  });

  test('GET /download file not found', async () => {
    const response = await supertest(app).get('/download?f=non_existing_file.jpg');
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('File not found or access denied');
  });
});