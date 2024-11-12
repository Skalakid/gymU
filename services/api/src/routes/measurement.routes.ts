import express from 'express';
import * as measurementController from '../controllers/measurements.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
  '/create',
  authenticateToken,
  measurementController.createMeasurement,
);
router.get(
  '/:id/all',
  authenticateToken,
  measurementController.getMeasurements,
);
router.get(
  '/:id/:bodyParts',
  authenticateToken,
  measurementController.getBodyPartsMeasurements,
);
router.get(
  '/:id/all/:timeInterval',
  authenticateToken,
  measurementController.getMesaurementsSince,
);
router.get(
  '/:id/:bodyParts/:timeInterval',
  authenticateToken,
  measurementController.getSelectedMeasurementsSince,
);

export = router;
