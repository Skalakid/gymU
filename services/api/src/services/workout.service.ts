import {
  getWorkoutIdsSavedByUser,
  isWorkoutSavedByUser,
} from '../persistance/userWorkout.db';
import * as WorkoutDB from '../persistance/workout.db';
import { PaginatedResponse } from '../types/api';
import { DetailedExercise } from '../types/exercise';
import { ExerciseWorkoutItem, GeneralWorkout } from '../types/workout';

async function getAllWorkouts(
  skip: number,
  page: number,
  pageSize: number,
  tagIds: number[] | null,
  userId: number,
) {
  const workouts = await WorkoutDB.getAllWorkoutsPaginated(
    skip,
    pageSize,
    tagIds,
  );
  const allWorkoutsCount = await WorkoutDB.countAllFilteredWorkouts(tagIds);
  const workoutIdsSavedByUser = (await getWorkoutIdsSavedByUser(userId)).map(
    (item) => item.workout_id,
  );

  const workoutsWithTagName: GeneralWorkout[] = workouts.map(
    ({
      workout_level,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      workout_level_id,
      ...workout
    }) => {
      return {
        workout_id: workout.workout_id,
        name: workout.name,
        workout_tags: workout.workout_tags.map(
          (workout_tag) => workout_tag.tag.name,
        ),
        workout_level: workout_level.name,
        isSavedByUser: workoutIdsSavedByUser.includes(workout.workout_id),
      } as GeneralWorkout;
    },
  );

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

async function getWorkoutDetails(workoutId: number, userId: number) {
  const workout = await WorkoutDB.getWorkoutDetails(workoutId);

  if (!workout) {
    throw null;
  }

  const isSavedByUser = await isWorkoutSavedByUser(userId, workoutId);

  const exerciseItems: DetailedExercise[] = workout.exercise_template_item
    .map((item) => {
      return {
        exercise_id: item.exercise_id,
        name: item.exercise.name,
        exercise_type: item.exercise.exercise_type.name,
        value: JSON.parse(item.value as string),
        order_index: item.order_index,
        body_parts: item.exercise.exercises_body_parts.map(
          (item) => item.body_part.name,
        ),
      };
    })
    .sort((a, b) => a.order_index - b.order_index);

  const workoutWithTagName = {
    workout_id: workout.workout_id,
    name: workout.name,
    description: workout.description,
    private: workout.private,
    created_at: workout.created_at,
    author: {
      user_id: workout.author_id,
      username: workout.app_user.username,
    },
    workout_tags: workout.workout_tags.map(
      (workout_tag) => workout_tag.tag.name,
    ),
    workout_level: workout.workout_level.name,
    exercises: exerciseItems,
    isSavedByUser,
  };

  return workoutWithTagName;
}

async function createWorkout(
  author_id: number,
  name: string,
  description: string,
  is_private: boolean,
  workout_level_id: number,
  tag_ids: number[],
  exercises: ExerciseWorkoutItem[],
) {
  return await WorkoutDB.createWorkout(
    author_id,
    name,
    description,
    is_private,
    workout_level_id,
    tag_ids,
    exercises,
  );
}

async function getAllWorkoutTags() {
  const tags = (await WorkoutDB.getAllWorkoutTags())
    .map((tag) => tag.workout_tags.map((workout_tag) => workout_tag.tag))
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

export { getAllWorkouts, getWorkoutDetails, createWorkout, getAllWorkoutTags };
