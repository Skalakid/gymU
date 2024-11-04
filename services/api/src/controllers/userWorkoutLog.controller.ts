import { NextFunction, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ExerciseHistoryItem } from '../types/exerciseHistoryItem';
import * as UserWorkoutLogService from '../services/userWorkoutLog.service';
import ApiError from '../error/ApiError';

async function createWorkoutLog(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      user_workout_id,
      opinion,
      exercises,
    }: {
      user_workout_id: number;
      opinion: number;
      exercises: ExerciseHistoryItem[];
    } = req.body;

    if (!user_workout_id || !opinion || !exercises) {
      throw new ApiError(400, 'Missing required fields');
    }

    if (exercises.length === 0) {
      throw new ApiError(400, 'Exercises cannot be empty');
    }

    if (
      exercises.some(
        (exercise) =>
          !exercise.exercise_id ||
          !exercise.value ||
          !exercise.opinion ||
          !exercise.order_index,
      )
    ) {
      throw new ApiError(400, 'Invalid exercise data');
    }

    const workoutLog = await UserWorkoutLogService.createWorkoutLog(
      user_workout_id,
      opinion,
      exercises,
    );
    res.status(201).send(workoutLog);
  } catch (error) {
    next(error);
  }
}

export { createWorkoutLog };
