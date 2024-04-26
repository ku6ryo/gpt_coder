import multer from 'multer';
import sizeOf from 'image-size';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadController = (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  const dimensions = sizeOf(req.file.buffer);
  res.send({ width: dimensions.width, height: dimensions.height });
};

export { upload, uploadController };