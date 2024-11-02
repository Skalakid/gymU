import { NextFunction, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as MeasurementService from '../services/measurements.service';
import ApiError from '../error/ApiError';

function createMeasurement(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { user_id, weight, biceps, chest, waist, hips, thigh, calf } =
      req.body;

    if (
      user_id === undefined ||
      weight === undefined ||
      biceps === undefined ||
      chest === undefined ||
      waist === undefined ||
      hips === undefined ||
      thigh === undefined ||
      calf === undefined
    ) {
      throw new ApiError(400, 'Missing required fields');
    }

    const newMeasurement = MeasurementService.createMeasurement(
      user_id,
      weight,
      biceps,
      chest,
      waist,
      hips,
      thigh,
      calf,
    );

    if (!newMeasurement) {
      throw new ApiError(500, 'Failed to create workout');
    }

    console.log(newMeasurement);

    res.status(201).send(newMeasurement);
  } catch (error) {
    next(error);
  }
}

export { createMeasurement };
