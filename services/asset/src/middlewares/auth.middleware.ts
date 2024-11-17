import { Request, Response, NextFunction } from 'express';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const apiKey = req.header('apiKey');
    if (!apiKey) {
      res.status(401).send('API key missing');
      return;
    }
    const password = process.env.ASSET_SERVICE_PASSWORD;
    console.log(password, apiKey);
    if (password !== apiKey) {
      res.status(401).send('Unauthorized');
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
}

export { authenticateToken };
