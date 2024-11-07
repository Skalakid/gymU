import { prisma } from '../config/db.server';
import { ExerciseWorkoutItem } from '../types/workout';

async function getAllWorkoutsPaginated(
  skip: number,
  pageSize: number,
  tagIds: number[] | null,
) {
  return await prisma.workout_template.findMany({
    skip: skip,
    take: pageSize,
    where: tagIds
      ? {
          workout_tags: {
            some: {
              tag: {
                tag_id: {
                  in: tagIds,
                },
              },
            },
          },
        }
      : undefined,
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
}

async function countAllFilteredWorkouts(tagIds: number[] | null) {
  return await prisma.workout_template.count({
    where: tagIds
      ? {
          workout_tags: {
            some: {
              tag: {
                tag_id: {
                  in: tagIds,
                },
              },
            },
          },
        }
      : undefined,
  });
}

async function getWorkoutDetails(workoutId: number) {
  return await prisma.workout_template.findUnique({
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
              exercises_body_parts: {
                select: {
                  body_part: {
                    select: {
                      name: true,
                    },
                  },
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
}

async function createWorkout(
  author_id: number,
  name: string,
  description: string,
  is_private: boolean,
  workout_level_id: number,
  tag_ids: number[],
  exercises: ExerciseWorkoutItem[],
) {
  const newWorkout = await prisma.workout_template.create({
    data: {
      author_id: author_id || 1,
      name,
      description,
      created_at: new Date(),
      private: is_private,
      workout_level_id,
    },
  });
  if (!newWorkout) {
    return null;
  }

  const workoutTags = tag_ids.map((tag_id: number) => {
    return prisma.workout_tags.create({
      data: {
        tag_id,
        workout_template_id: newWorkout.workout_id,
      },
    });
  });
  const exerciseItems = exercises.map((item: ExerciseWorkoutItem) => {
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

  return newWorkout;
}

async function getAllWorkoutTags() {
  return await prisma.workout_template.findMany({
    select: {
      workout_tags: {
        select: {
          tag: true,
        },
      },
    },
  });
}

async function getWorkoutDifficulties() {
  return await prisma.workout_level.findMany();
}

export {
  getAllWorkoutsPaginated,
  countAllFilteredWorkouts,
  getWorkoutDetails,
  createWorkout,
  getAllWorkoutTags,
  getWorkoutDifficulties,
};
