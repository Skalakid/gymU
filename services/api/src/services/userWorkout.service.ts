import * as UserWorkoutDB from '../persistance/userWorkout.db';
import { PaginatedResponse } from '../types/api';
import { GeneralWorkout } from '../types/workout';

async function addWorkoutToUserAccount(userId: number, workoutId: number) {
  return await UserWorkoutDB.addWorkoutToUserAccount(userId, workoutId);
}

async function getAllUserWorkouts(
  userId: number,
  skip: number,
  page: number,
  pageSize: number,
  tagIds: number[] | null,
) {
  const workouts = (await UserWorkoutDB.getAllUserWorkouts(userId)).map(
    (item) => item.workout_template,
  );

  const allWorkoutsCount = await UserWorkoutDB.countAllFilteredWorkouts(tagIds);

  const workoutsWithTagName: GeneralWorkout[] = workouts.map((workout) => {
    return {
      workout_id: workout.workout_id,
      name: workout.name,
      workout_tags: workout.workout_tags.map(
        (workout_tag) => workout_tag.tag.name || '',
      ),
      workout_level: workout.workout_level.name,
    };
  });

  const paginatedResponse: PaginatedResponse<GeneralWorkout[]> = {
    currentPage: page,
    pages: Math.ceil(allWorkoutsCount / pageSize),
    totalItems: allWorkoutsCount,
    pageSize,
    currentPageSize: workoutsWithTagName.length,
    data: workoutsWithTagName,
  };

  return paginatedResponse;
}

async function getAllWorkoutTags() {
  const tags = (await UserWorkoutDB.getAllWorkoutTags())
    .map((tag) =>
      tag.workout_template.workout_tags.map((workout_tag) => workout_tag.tag),
    )
    .flat(1);

  const uniqueIds: number[] = [];
  return tags.filter((tag) => {
    if (uniqueIds.includes(tag.tag_id)) {
      return false;
    }
    uniqueIds.push(tag.tag_id);
    return true;
  });
}

export { addWorkoutToUserAccount, getAllUserWorkouts, getAllWorkoutTags };
