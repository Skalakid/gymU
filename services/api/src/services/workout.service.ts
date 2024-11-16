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
    (item) => item.workoutId,
  );

  const workoutsWithTagName: GeneralWorkout[] = workouts.map(
    ({
      workoutLevel,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      workoutLevelId,
      ...workout
    }) => {
      return {
        workoutId: workout.workoutId,
        name: workout.name,
        workoutTags: workout.workoutTags.map(
          (workoutTag) => workoutTag.tag.name,
        ),
        workoutLevel: workoutLevel.name,
        isSavedByUser: workoutIdsSavedByUser.includes(workout.workoutId),
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

  const exerciseItems: DetailedExercise[] = workout.exerciseTemplateItems
    .map((item) => {
      return {
        exerciseId: item.exerciseId,
        name: item.exercise.name,
        exerciseType: item.exercise.exerciseType.name,
        value: JSON.parse(item.value as string),
        orderIndex: item.orderIndex,
        bodyParts: item.exercise.exercisesBodyParts.map(
          (item) => item.bodyPart.name,
        ),
      };
    })
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const workoutWithTagName = {
    workoutId: workout.workoutId,
    name: workout.name,
    description: workout.description,
    private: workout.private,
    createdAt: workout.createdAt,
    author: {
      userId: workout.authorId,
      username: workout.appUser.username,
    },
    workoutTags: workout.workoutTags.map((workoutTag) => workoutTag.tag.name),
    workoutLevel: workout.workoutLevel.name,
    exercises: exerciseItems,
    isSavedByUser,
  };

  return workoutWithTagName;
}

async function createWorkout(
  authorId: number,
  name: string,
  description: string,
  isPrivate: boolean,
  workoutLevelId: number,
  tagIds: number[],
  exercises: ExerciseWorkoutItem[],
) {
  return await WorkoutDB.createWorkout(
    authorId,
    name,
    description,
    isPrivate,
    workoutLevelId,
    tagIds,
    exercises,
  );
}

async function getAllWorkoutTags() {
  const tags = (await WorkoutDB.getAllWorkoutTags())
    .map((tag) => tag.workoutTags.map((workoutTag) => workoutTag.tag))
    .flat(1);

  const uniqueIds: number[] = [];
  return tags.filter((tag) => {
    if (uniqueIds.includes(tag.tagId)) {
      return false;
    }
    uniqueIds.push(tag.tagId);
    return true;
  });
}

async function getWorkoutDifficulties() {
  const difficulties = await WorkoutDB.getWorkoutDifficulties();
  return difficulties.sort((a, b) => a.levelId - b.levelId);
}

export {
  getAllWorkouts,
  getWorkoutDetails,
  createWorkout,
  getAllWorkoutTags,
  getWorkoutDifficulties,
};
