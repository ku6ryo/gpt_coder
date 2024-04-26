import { Request, Response } from 'express';
import { Storage } from '@google-cloud/storage';

const downloadController = async (req: Request, res: Response) => {
  const filePath = req.query.f;
  if (typeof filePath !== 'string' || filePath.length === 0) {
    res.status(400).send('File path is required');
    return;
  }
  const storage = new Storage();
  const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);
  const file = bucket.file(filePath);
  const downloadStream = file.createReadStream();

  downloadStream.on('error', (error) => {
    res.status(404).send('File not found or access denied');
  });

  downloadStream.on('end', () => {
    res.end();
  });

  downloadStream.pipe(res);
};

export default downloadController;