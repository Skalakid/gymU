import { NextFunction, Request, Response } from 'express';
import { getAsset } from '../utils/assets';
import ApiError from '../error/ApiError';

async function getFileFromAssetService(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { file } = req.query;
  if (typeof file !== 'string') {
    res.status(400).send('Invalid file path');
    return;
  }

  try {
    const { stream, response } = await getAsset(file);
    if (!response || !stream) {
      throw new ApiError(500, response.statusText);
    }

    res.setHeader(
      'Content-Type',
      response.headers.get('Content-Type') || 'application/octet-stream',
    );
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
}

export { getFileFromAssetService };
