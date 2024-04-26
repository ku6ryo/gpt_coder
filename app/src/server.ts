import express from 'express';
import { upload, uploadController } from './controllers/uploadController';
import sumController from './controllers/sumController';
import subtractController from './controllers/subtractController';
import multiplyController from './controllers/multiplyController';
import divideController from './controllers/divideController';
import downloadController from './controllers/downloadController';
import helloController from './controllers/helloController';
import fibonacciController from './controllers/fibonacciController';
import fetchHtmlController from './controllers/fetchHtmlController';

export const createApp = () => {
  const app = express();

  app.get('/sum', sumController);
  app.get('/subtract', subtractController);
  app.get('/multiply', multiplyController);
  app.get('/divide', divideController);
  app.post('/upload', upload.single('image'), uploadController);
  app.get('/download', downloadController);
  app.get('/hello', helloController);
  app.get('/fibonacci', fibonacciController);
  app.get('/fetch-html', fetchHtmlController);

  return app;
};

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}