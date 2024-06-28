import { NextFunction, Response } from 'express';
import * as UserWorkoutService from '../services/userWorkout.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import ApiError from '../error/ApiError';

async function addWorkoutToUserAccount(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = Number(req.user);
    const workoutId = Number(req.params.workout);

    if (!userId) {
      throw new ApiError(401, 'User not authenticated');
    }

    if (Number.isNaN(workoutId) || workoutId <= 0) {
      throw new ApiError(400, 'Invalid workout id');
    }

    await UserWorkoutService.addWorkoutToUserAccount(userId, workoutId);

    res.status(201).send({ message: 'Workout added to user account' });
  } catch (error) {
    next(error);
  }
}

export { addWorkoutToUserAccount };
