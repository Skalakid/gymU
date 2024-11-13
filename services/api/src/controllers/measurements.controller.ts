import { NextFunction, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as MeasurementService from '../services/measurements.service';
import ApiError from '../error/ApiError';

async function createMeasurement(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      userId,
      saveDate,
      weight,
      biceps,
      chest,
      waist,
      hips,
      thigh,
      calf,
    } = req.body;

    if (
      userId === undefined ||
      saveDate === undefined ||
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

    const newMeasurement = await MeasurementService.createMeasurement(
      userId,
      saveDate,
      weight,
      biceps,
      chest,
      waist,
      hips,
      thigh,
      calf,
    );

    if (!newMeasurement) {
      throw new ApiError(500, 'Failed to create measurement');
    }

    res.status(201).send(newMeasurement);
  } catch (error) {
    next(error);
  }
}

async function getMeasurements(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = Number(req.params.id) || -1;

    if (!userId || userId <= 0) {
      throw new ApiError(400, 'Invalid user id');
    }

    const measurements = await MeasurementService.getMeasurements(userId);

    if (!measurements) {
      throw new ApiError(500, 'Failed to get measurements');
    }

    res.status(201).send(measurements);
  } catch (error) {
    next(error);
  }
}

async function getMesaurementsSince(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = Number(req.params.id) || -1;
    const timeInterval = Number(req.params.timeInterval) || -1;

    if (!userId || userId <= 0) {
      throw new ApiError(400, 'Invalid user id');
    }

    if (!timeInterval || timeInterval <= 0) {
      throw new ApiError(400, 'Invalid start date');
    }

    const measurements = await MeasurementService.getMeasurementsSince(
      userId,
      timeInterval,
    );

    if (!measurements) {
      throw new ApiError(500, 'Failed to get measurements');
    }

    res.status(201).send(measurements);
  } catch (error) {
    next(error);
  }
}

export { createMeasurement, getMeasurements, getMesaurementsSince };
