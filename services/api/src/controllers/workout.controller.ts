import { Response } from 'express';
import { prisma } from '../config/db.server';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as WorkoutService from '../services/workout.service';

async function getAllWorkouts(req: AuthRequest, res: Response) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.size) || 10;
    const skip = (page - 1) * pageSize;
    const tags = req.query.tag_ids?.toString();

    let tagIds = null;
    if (tags) {
      tagIds = tags.split(',').map((item) => Number(item));
    }

    const allWorkoutsPaginated = await WorkoutService.getAllWorkouts(
      skip,
      page,
      pageSize,
      tagIds,
    );

    res.status(201).send(allWorkoutsPaginated);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function getWorkoutDetails(req: AuthRequest, res: Response) {
  try {
    const workoutId = Number(req.params.id) || -1;
    if (Number.isNaN(workoutId) || workoutId <= 0) {
      return res.status(400).send('Invalid workout id');
    }

    const workoutWithTagName =
      await WorkoutService.getWorkoutDetails(workoutId);
    if (!workoutWithTagName) {
      return res.status(404).send('Workout not found');
    }

    res.status(201).send(workoutWithTagName);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function createWorkout(req: AuthRequest, res: Response) {
  try {
    const {
      name,
      description,
      is_private,
      workout_level_id,
      tag_ids,
      exercises,
    } = req.body;

    if (
      name === undefined ||
      description === undefined ||
      is_private === undefined ||
      workout_level_id === undefined ||
      tag_ids === undefined ||
      exercises === undefined
    ) {
      return res.status(400).send('Missing required fields');
    }

    const newWorkout = await WorkoutService.createWorkout(
      Number(req.user),
      name,
      description,
      is_private,
      workout_level_id,
      tag_ids,
      exercises,
    );
    if (!newWorkout) {
      return res.status(500).send('Failed to create workout');
    }

    return res.status(201).send(newWorkout);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function getAllWorkoutTags(req: AuthRequest, res: Response) {
  try {
    const workoutTags = await prisma.tag.findMany({});
    res.status(201).send({
      workoutTags: workoutTags,
    });
  } catch (error) {
    res.sendStatus(500);
  }
}

export { getAllWorkouts, getWorkoutDetails, createWorkout, getAllWorkoutTags };
