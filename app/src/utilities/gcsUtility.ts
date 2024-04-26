import { Storage } from '@google-cloud/storage';

const createGCSBucket = (projectId: string, credentials: string, bucketName: string) => {
  const gcStorage = new Storage({
    projectId,
    credentials: JSON.parse(credentials)
  });
  return gcStorage.bucket(bucketName);
};

export { createGCSBucket };
