import express from 'express';
import * as assetController from '../controllers/asset.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authenticateToken, assetController.getFileFromAssetService);

export = router;
