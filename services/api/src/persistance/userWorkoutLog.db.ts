import { ExerciseHistoryItem } from '../types/exerciseHistoryItem';
import { prisma } from '../config/db.server';

async function createWorkoutLog(
  userWorkoutId: number,
  opinion: number,
  exercises: ExerciseHistoryItem[],
) {
  const timeStamp = new Date();

  const log = await prisma.userWorkoutLog.create({
    data: {
      userWorkoutId: userWorkoutId,
      opinion: opinion,
      logDate: timeStamp,
    },
  });

  exercises.forEach(async (exercise) => {
    await prisma.userExerciseHistoryItem.create({
      data: {
        userLogId: log.logId,
        exerciseId: exercise.exerciseId,
        opinion: exercise.opinion,
        value: exercise.value,
        orderIndex: exercise.orderIndex,
        timestamp: timeStamp,
      },
    });
  });

  return log;
}

async function getUserWorkoutLogs(userId: number) {
  return await prisma.userWorkoutLog.findMany({
    where: {
      userWorkout: {
        userId: userId,
      },
    },
    orderBy: {
      logDate: 'desc',
    },
    include: {
      userWorkout: true,
    },
  });
}

export { createWorkoutLog, getUserWorkoutLogs };
