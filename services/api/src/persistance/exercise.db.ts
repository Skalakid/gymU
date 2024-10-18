import { prisma } from '../config/db.server';

async function getAllExercises() {
  const exercises = await prisma.exercise.findMany({
    select: {
      exercise_id: true,
      name: true,
      description: true,
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
  });

  return exercises;
}

async function getExerciseDetails(exercise_id: number) {
  const exercises = await prisma.exercise.findUnique({
    where: {
      exercise_id: exercise_id,
    },
    select: {
      exercise_id: true,
      name: true,
      description: true,
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
  });

  return exercises;
}

async function getAllExersiceTypes() {
  const exerciseTypes = await prisma.exercise_type.findMany({
    select: {
      name: true,
      has_reps: true,
      has_series: true,
      has_weights: true,
      has_time: true,
      is_break: true,
    },
  });
  return exerciseTypes;
}

export { getAllExercises, getExerciseDetails, getAllExersiceTypes };
