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
      userWorkoutId,
      opinion,
      exercises,
    }: {
      userWorkoutId: number;
      opinion: number;
      exercises: ExerciseHistoryItem[];
    } = req.body;

    if (!userWorkoutId || opinion === undefined || !exercises) {
      throw new ApiError(400, 'Missing required fields');
    }

    if (exercises.length === 0) {
      throw new ApiError(400, 'Exercises cannot be empty');
    }

    if (
      exercises.some(
        (exercise) =>
          (!exercise.exerciseId && exercise.exerciseId !== 0) ||
          !exercise.value ||
          (!exercise.opinion && exercise.opinion !== 0) ||
          (!exercise.orderIndex && exercise.orderIndex !== 0),
      )
    ) {
      throw new ApiError(400, 'Invalid exercise data');
    }

    const workoutLog = await UserWorkoutLogService.createWorkoutLog(
      userWorkoutId,
      opinion,
      exercises,
    );
    res.status(201).send(workoutLog);
  } catch (error) {
    next(error);
  }
}

export { createWorkoutLog };
