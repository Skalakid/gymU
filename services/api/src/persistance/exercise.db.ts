import { prisma } from '../config/db.server';

async function getAllExercises() {
  const exercises = await prisma.exercise.findMany({
    select: {
      exerciseId: true,
      name: true,
      description: true,
      exerciseType: {
        select: {
          name: true,
        },
      },
      exercisesBodyParts: {
        select: {
          bodyPart: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return exercises;
}

async function getExerciseDetails(exerciseId: number) {
  const exercises = await prisma.exercise.findUnique({
    where: {
      exerciseId: exerciseId,
    },
    select: {
      exerciseId: true,
      name: true,
      description: true,
      exerciseType: {
        select: {
          name: true,
        },
      },
      exercisesBodyParts: {
        select: {
          bodyPart: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return exercises;
}

async function getAllExersiceTypes() {
  const exerciseTypes = await prisma.exerciseType.findMany({
    select: {
      name: true,
      hasReps: true,
      hasSets: true,
      hasWeights: true,
      hasTime: true,
      isBreak: true,
    },
  });
  return exerciseTypes;
}

export { getAllExercises, getExerciseDetails, getAllExersiceTypes };
