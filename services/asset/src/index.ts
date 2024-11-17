import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 4000;

app.get('/assets/:filename', (req: Request, res: Response) => {
  const { filename } = req.params;
  if (!filename) {
    res.status(400).send('Invalid request');
  }

  const filePath = path.join(__dirname, 'assets', filename);
  res.sendFile(filePath);
});

app.get('/', (req: Request, res: Response) => {
  res.send('gymU asset service');
});

app.listen(port, () => {
  console.log(`[asset service]: Server is running at http://localhost:${port}`);
});
