import { Response } from 'express';
import { prisma } from '../config/db.server';
import { AuthRequest } from '../middlewares/auth.middleware';
import { PaginatedResponse } from '../types/api.d';

async function getAllWorkouts(req: AuthRequest, res: Response) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.size) || 10;
    const skip = (page - 1) * pageSize;
    const tags = req.query.tag_ids as string;

    let tagsCondition = undefined;
    if (tags) {
      const tagIds = tags.split(',').map((item) => Number(item));
      tagsCondition = {
        workout_tags: {
          some: {
            tag: {
              tag_id: {
                in: tagIds,
              },
            },
          },
        },
      };
    }

    const allWorkouts = await prisma.workout_template.count({
      where: tagsCondition,
    });

    const workouts = await prisma.workout_template.findMany({
      skip: skip,
      take: pageSize,
      where: tagsCondition,
      include: {
        app_user: {
          select: {
            username: true,
          },
        },
        workout_tags: {
          select: {
            tag: true,
          },
        },
        workout_level: {
          select: {
            name: true,
          },
        },
      },
    });

    const workoutsWithTagName = workouts.map(
      ({
        app_user,
        author_id,
        workout_level,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        workout_level_id,
        ...workout
      }) => {
        return {
          ...workout,
          author: {
            user_id: author_id,
            username: app_user.username,
          },
          workout_tags: workout.workout_tags.map(
            (workout_tag) => workout_tag.tag.name,
          ),
          workout_level: workout_level.name,
        };
      },
    );

    const paginatedResponse: PaginatedResponse = {
      currentPage: page,
      pages: Math.ceil(allWorkouts / pageSize),
      totalItems: allWorkouts,
      pageSize,
      currentPageSize: workoutsWithTagName.length,
      data: workoutsWithTagName,
    };
    res.status(201).send(paginatedResponse);
  } catch (error) {
    return res.send(500).send('Internal server error');
  }
}

async function getWorkoutDetails(req: AuthRequest, res: Response) {
  try {
    const workoutId = req.params.id;
    const workout = await prisma.workout_template.findUnique({
      where: {
        workout_id: Number(workoutId),
      },
      include: {
        app_user: {
          select: {
            username: true,
          },
        },
        workout_tags: {
          select: {
            tag: true,
          },
        },
        workout_level: {
          select: {
            name: true,
          },
        },
        exercise_template_item: {
          select: {
            exercise: {
              select: {
                name: true,
                exercise_type: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            value: true,
            order_index: true,
            exercise_id: true,
          },
        },
      },
    });

    if (!workout) {
      return res.status(404).send('Workout not found');
    }

    const exerciseItems = workout.exercise_template_item
      .map((item) => {
        return {
          exercise_id: item.exercise_id,
          exercise_name: item.exercise.name,
          exercise_type: item.exercise.exercise_type.name,
          value: item.value,
          order_index: item.order_index,
        };
      })
      .sort((a, b) => a.order_index - b.order_index);

    const workoutWithTagName = {
      workout_id: workout.workout_id,
      name: workout.name,
      description: workout.description,
      private: workout.private,
      created_at: workout.created_at,
      author: {
        user_id: workout.author_id,
        username: workout.app_user.username,
      },
      workout_tags: workout.workout_tags.map(
        (workout_tag) => workout_tag.tag.name,
      ),
      workout_level: workout.workout_level.name,
      exercises: exerciseItems,
    };

    res.status(201).send(workoutWithTagName);
  } catch (error) {
    return res.send(500).send('Internal server error');
  }
}

type ExerciseItem = {
  exercise_id: number;
  value: number;
  order_index: number;
};

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

    const newWorkout = await prisma.workout_template.create({
      data: {
        author_id: Number(req.user) || 1,
        name,
        description,
        created_at: new Date(),
        private: is_private,
        workout_level_id,
      },
    });

    if (!newWorkout) {
      return res.status(500).send('Failed to create workout');
    }

    const workoutTags = tag_ids.map((tag_id: number) => {
      return prisma.workout_tags.create({
        data: {
          tag_id,
          workout_template_id: newWorkout.workout_id,
        },
      });
    });

    const exerciseItems = exercises.map((item: ExerciseItem) => {
      return prisma.exercise_template_item.create({
        data: {
          workout_template_id: newWorkout.workout_id,
          exercise_id: item.exercise_id,
          value: item.value,
          order_index: item.order_index,
        },
      });
    });

    await prisma.$transaction([...workoutTags, ...exerciseItems]);

    res.status(201).send(newWorkout);
  } catch (error) {
    return res.send(500).send('Internal server error');
  }
}

export { getAllWorkouts, getWorkoutDetails, createWorkout };
