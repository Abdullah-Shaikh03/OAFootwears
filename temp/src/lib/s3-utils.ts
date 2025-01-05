import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from './s3-config';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

export async function generatePresignedUploadUrl(fileType: string): Promise<{ uploadUrl: string; fileKey: string }> {
  const fileKey = `${uuidv4()}-${Date.now()}`;
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  return { uploadUrl, fileKey };
}

export async function generatePresignedGetUrl(fileKey: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}