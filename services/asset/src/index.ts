import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import { existsSync } from 'fs';
import { authenticateToken } from './middlewares/auth.middleware';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 4000;
const ASSETS_DIR_PATH = path.join(__dirname, 'assets');
const UPLOADS_DIR_PATH = path.join(ASSETS_DIR_PATH, 'uploads');

app.use(express.json());

const storage = multer.diskStorage({
  destination: UPLOADS_DIR_PATH,
  filename: function (req, file, cb) {
    const imageName = `${Date.now()}${file.originalname}`;
    cb(null, imageName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
});

app.post(
  '/assets/upload',
  authenticateToken,
  upload.single('file'),
  (req, res) => {
    const { file } = req;
    if (!file) {
      res.status(400).send('Invalid request');
      return;
    }

    res.status(201).json({
      url: `http://localhost:${port}/assets/uploads/${file.filename}`,
    });
  },
);

app.get('/assets', authenticateToken, (req: Request, res: Response) => {
  const filePath = req.query.file?.toString();
  if (!filePath) {
    res.status(400).send('Invalid request');
    return;
  }

  const assetPath = `${ASSETS_DIR_PATH}${filePath[0] === '/' ? '' : '/'}${filePath}`;
  if (!existsSync(assetPath)) {
    console.log('-------');
    res.status(404).send('File not found');
    return;
  }

  res.status(201).sendFile(assetPath);
});

app.get('/', (req: Request, res: Response) => {
  res.send('gymU asset service');
});

app.listen(port, () => {
  console.log(`[asset service]: Server is running at http://localhost:${port}`);
});
