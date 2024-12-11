import * as ExerciseDB from '../persistance/exercise.db';
import { BasicExercise, DetailedExercise } from '../types/exercise';

async function getAllExercises(): Promise<BasicExercise[]> {
  const exercises = (await ExerciseDB.getAllExercises()).map((exercise) => ({
    exerciseId: exercise.exerciseId,
    name: exercise.name,
    exerciseType: exercise.exerciseType.name,
    shortDescription: exercise.description?.substring(0, 40) + '...',
    bodyParts: exercise.exercisesBodyParts.map((bp) => bp.bodyPart.name),
  }));

  return exercises;
}

async function getExerciseDetails(
  exerciseId: number,
): Promise<DetailedExercise> {
  const exercise = await ExerciseDB.getExerciseDetails(exerciseId);
  if (!exercise) {
    throw new Error('Exercise not found');
  }

  return {
    exerciseId: exercise?.exerciseId,
    name: exercise?.name,
    description: exercise?.description ?? '',
    exerciseType: exercise?.exerciseType.name,
    imageUrls: exercise?.imageUrls,
    bodyParts: exercise?.exercisesBodyParts.map((bp) => bp.bodyPart.name),
  };
}

async function getAllExersiceTypes() {
  const exerciseTypes = await ExerciseDB.getAllExersiceTypes();
  return exerciseTypes;
}

export { getAllExercises, getExerciseDetails, getAllExersiceTypes };
