import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME!,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileExtension = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}/${uuidv4()}.${fileExtension}`);
    }
  })
});

export const deleteFromS3 = async (key: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
};