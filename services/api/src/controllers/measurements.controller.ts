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
      user_id,
      save_date,
      weight,
      biceps,
      chest,
      waist,
      hips,
      thigh,
      calf,
    } = req.body;

    if (
      user_id === undefined ||
      save_date === undefined ||
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
      user_id,
      save_date,
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
    const user_id = Number(req.params.id) || -1;

    if (!user_id || user_id <= 0) {
      throw new ApiError(400, 'Invalid user id');
    }

    const measurements = await MeasurementService.getMeasurements(user_id);

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
    const user_id = Number(req.params.id) || -1;
    const bodyParts = req.params.bodyParts;

    if (!user_id || user_id <= 0) {
      throw new ApiError(400, 'Invalid user id');
    }

    if (!bodyParts) {
      throw new ApiError(400, 'Provide body parts');
    }

    const bodyPartsArray = bodyParts.split(',');

    const measurements = await MeasurementService.getBodyPartsMeasurements(
      user_id,
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
    const user_id = Number(req.params.id) || -1;
    const time_interval = Number(req.params.timeInterval) || -1;

    if (!user_id || user_id <= 0) {
      throw new ApiError(400, 'Invalid user id');
    }

    if (!time_interval || time_interval <= 0) {
      throw new ApiError(400, 'Invalid start date');
    }

    const measurements = await MeasurementService.getMeasurementsSince(
      user_id,
      time_interval,
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
    const user_id = Number(req.params.id) || -1;
    const bodyParts = req.params.bodyParts;
    const time_interval = Number(req.params.timeInterval) || -1;

    if (!user_id || user_id <= 0) {
      throw new ApiError(400, 'Invalid user id');
    }

    if (!bodyParts) {
      throw new ApiError(400, 'Provide body parts');
    }

    if (!time_interval || time_interval <= 0) {
      throw new ApiError(400, 'Invalid start date');
    }

    const bodyPartsArray = bodyParts.split(',');

    const measurements = await MeasurementService.getSelectedMeasurementsSince(
      user_id,
      bodyPartsArray,
      time_interval,
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
