type BasicExercise = {
  exerciseId: number;
  name: string;
  exerciseType: string;
  bodyParts: string[];
  shortDescription: string;
};

type DetailedExercise = {
  exerciseId: number;
  name: string;
  exerciseType: string;
  bodyParts: string[];
  description: string;
};

type ExerciseItem = {
  exerciseId: number;
  exercise_name: string;
  exerciseType: string;
  value: string;
  orderIndex: number;
};

type ExerciseType = {
  hasReps: boolean;
  hasSets: boolean;
  hasTime: boolean;
  hasWeights: boolean;
  isBreak: boolean;
  name: string;
};

type ExerciseDetails = {
  sets: number | null;
  reps: number | null;
  weight: number | null;
  time: number | null;
  breakTime?: number | null;
  isBreak?: boolean;
};

type DetailedExerciseItem = DetailedExercise & {
  value: ExerciseDetails;
};

type OrderedExerciseItem = DetailedExerciseItem & {
  orderIndex: number;
};
