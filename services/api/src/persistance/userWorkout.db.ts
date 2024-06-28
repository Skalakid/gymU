import { prisma } from '../config/db.server';

async function addWorkoutToUserAccount(userId: number, workoutId: number) {
  await prisma.user_workout.create({
    data: {
      user_id: userId,
      workout_id: workoutId,
    },
  });
}

export { addWorkoutToUserAccount };
