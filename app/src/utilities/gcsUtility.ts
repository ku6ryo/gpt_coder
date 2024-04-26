import { Storage } from '@google-cloud/storage';

export const createGCSBucket = (projectId: string, credentials: string, bucketName: string) => {
  const gcStorage = new Storage({
    projectId,
    credentials: JSON.parse(credentials)
  });
  return gcStorage.bucket(bucketName);
};

export const createGCSBucketFromConfig = () => {
  const projectId = 'your-project-id';
  const credentials = JSON.stringify({
    client_email: 'your-client-email',
    private_key: 'your-private-key'
  });
  const bucketName = 'your-default-bucket-name';
  return createGCSBucket(projectId, credentials, bucketName);
};