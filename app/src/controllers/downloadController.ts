import { Request, Response } from 'express';
import { createGCSBucket } from '../utilities/gcsUtility';

/**
 * Downloads a file from a specified path and sends it as a response.
 *
 * @param {Request} req - The request object containing the file path.
 * @param {Response} res - The response object to send the file.
 * @return {Promise<void>} - A promise that resolves when the file is downloaded and sent.
 */
const downloadController = async (req: Request, res: Response) => {
  const filePath = req.query.f;
  if (typeof filePath !== 'string' || filePath.length === 0) {
    res.status(400).send('File path is required');
    return;
  }
  const bucket = createGCSBucket(
    process.env.GCLOUD_PROJECT_ID,
    process.env.GCLOUD_CREDENTIALS,
    process.env.GCLOUD_BUCKET_NAME || 'your-default-bucket-name'
  );
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