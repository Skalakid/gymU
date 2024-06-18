import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: string | JwtPayload | undefined;
}

function authenticateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.header('Authorization');
  const token = authToken && authToken.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const accesTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accesTokenSecret) {
      return res.status(500).send('Internal server error');
    }

    jwt.verify(token, accesTokenSecret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

export { authenticateToken };
