import { prisma } from '../config/db.server';

async function addWorkoutToUserAccount(userId: number, workoutId: number) {
  await prisma.user_workout.create({
    data: {
      user_id: userId,
      workout_id: workoutId,
    },
  });
}

async function getAllUserWorkouts(userId: number) {
  return await prisma.user_workout.findMany({
    where: {
      user_id: userId,
    },
    select: {
      workout_template: {
        select: {
          workout_id: true,
          name: true,
          workout_tags: {
            select: {
              tag: {
                select: {
                  name: true,
                },
              },
            },
          },
          workout_level: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

async function countAllFilteredWorkouts(tagIds: number[] | null) {
  return await prisma.user_workout.count({
    where: tagIds
      ? {
          workout_template: {
            workout_tags: {
              some: {
                tag: {
                  tag_id: {
                    in: tagIds,
                  },
                },
              },
            },
          },
        }
      : undefined,
  });
}

async function getAllWorkoutTags() {
  return await prisma.user_workout.findMany({
    select: {
      workout_template: {
        select: {
          workout_tags: {
            select: {
              tag: true,
            },
          },
        },
      },
    },
  });
}

export {
  addWorkoutToUserAccount,
  getAllUserWorkouts,
  countAllFilteredWorkouts,
  getAllWorkoutTags,
};
