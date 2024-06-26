import * as ExerciseDB from '../persistance/exercise.db';

async function getAllExercises() {
  const exercises = (await ExerciseDB.getAllExercises()).map((exercise) => ({
    exercise_id: exercise.exercise_id,
    name: exercise.name,
    exercise_type: exercise.exercise_type.name,
  }));

  return exercises;
}

async function getExerciseDetails(exercise_id: number) {
  const exercise = await ExerciseDB.getExerciseDetails(exercise_id);

  return {
    exercise_id: exercise?.exercise_id,
    name: exercise?.name,
    description: exercise?.description,
    exercise_type: exercise?.exercise_type.name,
    body_parts: exercise?.exercises_body_parts.map((bp) => bp.body_part.name),
  };
}

export { getAllExercises, getExerciseDetails };
