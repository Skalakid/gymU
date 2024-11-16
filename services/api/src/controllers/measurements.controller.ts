import { NextFunction, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as MeasurementService from '../services/measurements.service';
import ApiError from '../error/ApiError';
import { ReturnUser } from '../types/user';

async function createMeasurement(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { saveDate, weight, biceps, chest, waist, hips, thigh, calf } =
      req.body;

    const userId = Number((req.user as ReturnUser).userId) || 1;

    if (!userId) {
      throw new ApiError(400, 'Invalid user id');
    }

    if (
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
    const userId = Number((req.user as ReturnUser).userId) || 1;

    if (!userId) {
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

async function getBodyPartsMeasurements(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = Number((req.user as ReturnUser).userId) || 1;
    const bodyParts = req.params.bodyParts;

    if (!userId) {
      throw new ApiError(400, 'Invalid user id');
    }

    if (!bodyParts) {
      throw new ApiError(400, 'Provide body parts');
    }

    const bodyPartsArray = bodyParts.split(',');

    const measurements = await MeasurementService.getBodyPartsMeasurements(
      userId,
      bodyPartsArray,
    );

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
    const userId = Number((req.user as ReturnUser).userId) || 1;
    const timeInterval = Number(req.params.timeInterval) || -1;

    if (!userId) {
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

async function getSelectedMeasurementsSince(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = Number((req.user as ReturnUser).userId) || 1;
    const bodyParts = req.params.bodyParts;
    const timeInterval = Number(req.params.timeInterval) || -1;

    if (!userId) {
      throw new ApiError(400, 'Invalid user id');
    }

    if (!bodyParts) {
      throw new ApiError(400, 'Provide body parts');
    }

    if (!timeInterval || timeInterval <= 0) {
      throw new ApiError(400, 'Invalid start date');
    }

    const bodyPartsArray = bodyParts.split(',');

    const measurements = await MeasurementService.getSelectedMeasurementsSince(
      userId,
      bodyPartsArray,
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

export {
  createMeasurement,
  getMeasurements,
  getBodyPartsMeasurements,
  getMesaurementsSince,
  getSelectedMeasurementsSince,
};
