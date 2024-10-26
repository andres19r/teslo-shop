import { Request } from 'express';

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtension = ['jpg', 'jpgeg', 'png', 'gif'];
  if (validExtension.includes(fileExtension)) return callback(null, true);

  callback(null, false);
};
