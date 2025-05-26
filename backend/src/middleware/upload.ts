import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from '../lib/s3';
import { UploadRequest } from '../types/express';

const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

const buildKey = (folder: string, model: string, filename: string) =>
  `${folder}/${model}/${filename}`;

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req: UploadRequest, file, cb) => {
      const model = req.params?.model?.toUpperCase?.() || 'UNSPECIFIED';
      const filename = `${Date.now()}-${file.originalname}`;
      const key = buildKey('vehicles', model, filename);
      cb(null, key);
    },
  }),
});
