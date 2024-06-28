import * as UserWorkoutDB from '../persistance/userWorkout.db';

async function addWorkoutToUserAccount(userId: number, workoutId: number) {
  return await UserWorkoutDB.addWorkoutToUserAccount(userId, workoutId);
}

export { addWorkoutToUserAccount };
