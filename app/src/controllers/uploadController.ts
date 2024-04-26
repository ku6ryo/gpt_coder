import multer from 'multer';
import sizeOf from 'image-size';
import { createGCSBucket } from '../utilities/gcsUtility';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucket = createGCSBucket(
  process.env.GCLOUD_PROJECT_ID,
  process.env.GCLOUD_CREDENTIALS,
  process.env.GCLOUD_BUCKET_NAME || 'your-default-bucket-name'
);

const uploadController = async (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  // Upload image to Google Cloud Storage
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false
  });
  blobStream.on('error', err => {
    console.error(err);
    res.status(500).send('Could not upload the file.');
  });
  blobStream.on('finish', async () => {
    // Get image dimensions
    const dimensions = sizeOf(req.file.buffer);
    res.send({ width: dimensions.width, height: dimensions.height });
  });
  blobStream.end(req.file.buffer);
};

export { upload, uploadController };
