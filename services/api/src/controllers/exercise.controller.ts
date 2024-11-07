import { NextFunction, Request, Response } from 'express';
import * as ExerciseService from '../services/exercise.service';
import ApiError from '../error/ApiError';

async function getAllExercises(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const exercises = await ExerciseService.getAllExercises();
    res.status(201).send(exercises);
  } catch (error) {
    next(error);
  }
}

async function getExerciseDetails(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const exerciseId = Number(req.params.id) || -1;
    if (!exerciseId || exerciseId <= 0) {
      throw new ApiError(400, 'Invalid exercise id');
    }

    const exercises = await ExerciseService.getExerciseDetails(exerciseId);
    res.status(201).send(exercises);
  } catch (error) {
    next(error);
  }
}

async function getAllExersiceTypes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const exerciseTypes = await ExerciseService.getAllExersiceTypes();
    res.status(201).send(exerciseTypes);
  } catch (error) {
    next(error);
  }
}

export { getAllExercises, getExerciseDetails, getAllExersiceTypes };
