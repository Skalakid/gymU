import * as WorkoutDB from '../persistance/workout.db';
import { PaginatedResponse } from '../types/api.d';
import { ExerciseWorkoutItem } from '../types/workout';

async function getAllWorkouts(
  skip: number,
  page: number,
  pageSize: number,
  tagIds: number[] | null,
) {
  const workouts = await WorkoutDB.getAllWorkoutsPaginated(
    skip,
    pageSize,
    tagIds,
  );
  const allWorkoutsCount = await WorkoutDB.countAllFilteredWorkouts(tagIds);

  const workoutsWithTagName = workouts.map(
    ({
      app_user,
      author_id,
      workout_level,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      workout_level_id,
      ...workout
    }) => {
      return {
        ...workout,
        author: {
          user_id: author_id,
          username: app_user.username,
        },
        workout_tags: workout.workout_tags.map(
          (workout_tag) => workout_tag.tag.name,
        ),
        workout_level: workout_level.name,
      };
    },
  );

  const paginatedResponse: PaginatedResponse = {
    currentPage: page,
    pages: Math.ceil(allWorkoutsCount / pageSize),
    totalItems: allWorkoutsCount,
    pageSize,
    currentPageSize: workoutsWithTagName.length,
    data: workoutsWithTagName,
  };

  return paginatedResponse;
}

async function getWorkoutDetails(workoutId: number) {
  const workout = await WorkoutDB.getWorkoutDetails(workoutId);

  if (!workout) {
    throw null;
  }

  const exerciseItems = workout.exercise_template_item
    .map((item) => {
      return {
        exercise_id: item.exercise_id,
        exercise_name: item.exercise.name,
        exercise_type: item.exercise.exercise_type.name,
        value: item.value,
        order_index: item.order_index,
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
  };

  return workoutWithTagName;
}

function createWorkout(
  author_id: number,
  name: string,
  description: string,
  is_private: boolean,
  workout_level_id: number,
  tag_ids: number[],
  exercises: ExerciseWorkoutItem[],
) {
  return WorkoutDB.createWorkout(
    author_id,
    name,
    description,
    is_private,
    workout_level_id,
    tag_ids,
    exercises,
  );
}

export { getAllWorkouts, getWorkoutDetails, createWorkout };
