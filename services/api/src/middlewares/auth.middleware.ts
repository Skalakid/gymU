import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../error/ApiError';

interface AuthRequest extends Request {
  user?: string | JwtPayload | undefined;
}

function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.header('Authorization');
  const token = authToken && authToken.split(' ')[1];
  if (!token) {
    throw new ApiError(401, 'Unauthorized');
  }

  try {
    const accesTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accesTokenSecret) {
      throw new ApiError(500, 'Internal server error');
    }

    jwt.verify(token, accesTokenSecret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
}

export { authenticateToken };
export type { AuthRequest };
