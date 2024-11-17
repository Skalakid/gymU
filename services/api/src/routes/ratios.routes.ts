import express from 'express';
import * as ratiosController from '../controllers/ratios.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/bmi', authenticateToken, ratiosController.calculateBMI);

export = router;
