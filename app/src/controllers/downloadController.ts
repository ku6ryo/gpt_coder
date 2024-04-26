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
  const { f: filePath } = req.query;
  if (!filePath || typeof filePath !== 'string') {
    res.status(400).send('Invalid file path');
    return;
  }
  const bucket = createGCSBucket(
    process.env.GCLOUD_PROJECT_ID,
    process.env.GCLOUD_CREDENTIALS,
    process.env.GCLOUD_BUCKET_NAME
  );
  const file = bucket.file(filePath);
  const downloadStream = file.createReadStream();

  downloadStream.on('error', () => res.sendStatus(404));
  downloadStream.on('end', () => res.end());

  downloadStream.pipe(res);
};

export default downloadController;