import express from 'express';
import { upload, uploadController } from './controllers/uploadController';
import sumController from './controllers/sumController';
import subtractController from './controllers/subtractController';
import helloController from './controllers/helloController';

export const createApp = () => {
  const app = express();

  app.get('/sum', sumController);
  app.get('/subtract', subtractController);
  app.get('/hello', helloController);
  app.post('/upload', upload.single('image'), uploadController);

  return app;
};

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}