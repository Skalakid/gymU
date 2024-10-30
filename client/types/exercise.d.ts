type BasicExercise = {
  exercise_id: number;
  name: string;
  exercise_type: string;
  body_parts: string[];
  shortDescription: string;
};

type DetailedExercise = {
  exercise_id: number;
  name: string;
  exercise_type: string;
  body_parts: string[];
  description: string;
};

type ExerciseItem = {
  exercise_id: number;
  exercise_name: string;
  exercise_type: string;
  value: string;
  order_index: number;
};

type ExerciseType = {
  has_reps: boolean;
  has_sets: boolean;
  has_time: boolean;
  has_weights: boolean;
  is_break: boolean;
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
