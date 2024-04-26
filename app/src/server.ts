import express from 'express';
import sumController from './controllers/sumController';
import subtractController from './controllers/subtractController';
import helloController from './controllers/helloController';

export const createApp = () => {
  const app = express();

  // Example URL: http://localhost:3000/sum?a=10&b=5
  app.get('/sum', sumController);

  // Example URL: http://localhost:3000/subtract?a=10&b=5
  app.get('/subtract', subtractController);

  // New Hello endpoint
  app.get('/hello', helloController);

  return app;
};

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}