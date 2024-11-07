import * as UserWorkoutLogDB from '../persistance/userWorkoutLog.db';
import { ExerciseHistoryItem } from '../types/exerciseHistoryItem';

async function createWorkoutLog(
  user_workout_id: number,
  opinion: number,
  exercises: ExerciseHistoryItem[],
) {
  function parseOpinion(value: number): number {
    if (value < 0) {
      return -1;
    }
    if (value > 0) {
      return 1;
    }
    return 0;
  }

  const workoutOpinion = parseOpinion(opinion);
  const workoutExercises = exercises.map((exercise) => ({
    ...exercise,
    opinion: parseOpinion(exercise.opinion),
  }));

  return await UserWorkoutLogDB.createWorkoutLog(
    user_workout_id,
    workoutOpinion,
    workoutExercises,
  );
}

export { createWorkoutLog };
