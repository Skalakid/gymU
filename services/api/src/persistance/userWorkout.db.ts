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
          name: true,
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
      },
    },
  });
}

export { addWorkoutToUserAccount, getAllUserWorkouts };
