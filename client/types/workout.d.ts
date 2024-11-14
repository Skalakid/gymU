type WorkoutType = {
  tagId: number;
  name: string;
};

type Workout = {
  workoutId: number;
  name: string;
  description: string;
  createdAt: string;
  private: boolean;
  workoutTags: string[];
  author: {
    userId: number;
    username: string;
  };
  workoutLevel: string;
  exercises: DetailedExerciseItem[];
  isSavedByUser?: boolean;
};

type SimplifiedWorkout = {
  workoutId: number;
  name: string;
  level: string;
  tags: string[];
};

type Difficulty = {
  levelId: number;
  name: string;
};

type WorkoutGeneralInfo = {
  name: string;
  description: string;
  dificulty: DificultiesData;
  isPrivate: boolean;
  tags: WorkoutType[];
};

type WorkoutTagsRespone = {
  workoutTags: WorkoutType[];
};
