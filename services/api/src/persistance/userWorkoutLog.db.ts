import { ExerciseHistoryItem } from '../types/exerciseHistoryItem';
import { prisma } from '../config/db.server';

async function createWorkoutLog(
  user_workout_id: number,
  opinion: number,
  exercises: ExerciseHistoryItem[],
) {
  const timeStamp = new Date();

  const log = await prisma.user_workout_log.create({
    data: {
      user_workout_id: user_workout_id,
      opinion: opinion,
      log_date: timeStamp,
    },
  });

  exercises.forEach(async (exercise) => {
    await prisma.user_exercise_history_item.create({
      data: {
        user_log_id: log.log_id,
        exercise_id: exercise.exercise_id,
        opinion: exercise.opinion,
        value: exercise.value,
        order_index: exercise.order_index,
        timestamp: timeStamp,
      },
    });
  });

  return log;
}

export { createWorkoutLog };
