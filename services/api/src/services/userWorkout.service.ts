import * as UserWorkoutDB from '../persistance/userWorkout.db';

async function addWorkoutToUserAccount(userId: number, workoutId: number) {
  return await UserWorkoutDB.addWorkoutToUserAccount(userId, workoutId);
}

async function getAllUserWorkouts(userId: number) {
  const workouts = (await UserWorkoutDB.getAllUserWorkouts(userId)).map(
    (item) => item.workout_template,
  );

  const workoutsWithTagName = workouts.map(({ workout_level, ...workout }) => {
    return {
      ...workout,
      workout_tags: workout.workout_tags.map(
        (workout_tag) => workout_tag.tag.name,
      ),
      workout_level: workout_level.name,
    };
  });

  return workoutsWithTagName;
}

export { addWorkoutToUserAccount, getAllUserWorkouts };
