import express from 'express';
import * as measurementController from '../controllers/measurements.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
  '/create',
  authenticateToken,
  measurementController.createMeasurement,
);
router.get('/:id', authenticateToken, measurementController.getMeasurements);
router.get(
  '/:id/:timeInterval',
  authenticateToken,
  measurementController.getMesaurementsSince,
);

export = router;
