type NewExerciseType = {
  name: string;
  has_reps: boolean;
  has_sets: boolean;
  has_weights: boolean;
  has_time: boolean;
  is_break: boolean;
};

type NewExercise = {
  exercise_type_id: number;
  name: string;
  description: string;
  body_parts: string[];
};

type BasicExercise = {
  exercise_id: number;
  name: string;
  exercise_type: string;
  body_parts: string[];
  shortDescription?: string;
};

type ExerciseDetails = {
  sets?: number;
  reps?: number;
  weight?: number;
  time?: number;
  breakTime?: number;
  isBreak?: boolean;
};

type DetailedExercise = {
  exercise_id: number;
  name: string;
  exercise_type: string;
  body_parts: string[];
  value: ExerciseDetails;
  order_index: number;
};

type NewExerciseTemplateItem = {
  workout_template_id: number;
  exercise_id: number;
  value: Prisma.JsonValue;
  order_index: number;
};

export type {
  NewExerciseType,
  NewExercise,
  NewExerciseTemplateItem,
  BasicExercise,
  DetailedExercise,
};
