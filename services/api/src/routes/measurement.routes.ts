import express from 'express';
import * as measurementController from '../controllers/measurements.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
  '/create',
  authenticateToken,
  measurementController.createMeasurement,
);
router.get('/all', authenticateToken, measurementController.getMeasurements);
router.get(
  '/:bodyParts',
  authenticateToken,
  measurementController.getBodyPartsMeasurements,
);
router.get(
  '/all/:timeInterval',
  authenticateToken,
  measurementController.getMesaurementsSince,
);
router.get(
  '/:bodyParts/:timeInterval',
  authenticateToken,
  measurementController.getSelectedMeasurementsSince,
);

export = router;
