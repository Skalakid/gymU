import { NextFunction, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as RatiosService from '../services/ratios.service';
import ApiError from '../error/ApiError';
import { ReturnUser } from '../types/user';

async function calculateBMI(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = Number((req.user as ReturnUser).userId) || 1;

    if (!userId) {
      throw new ApiError(400, 'Invalid user id');
    }

    const BMI = await RatiosService.calculateBMI(userId);

    if (!BMI || BMI === -1) {
      throw new ApiError(500, 'Failed to oobtain BMI');
    }

    res.status(201).send({ BMI });
  } catch (error) {
    next(error);
  }
}

export { calculateBMI };
