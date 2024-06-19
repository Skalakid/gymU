type NewExerciseType = {
  name: string;
  has_reps: boolean;
  has_series: boolean;
  has_weights: boolean;
  has_time: boolean;
  is_break: boolean;
};

type NewExercise = {
  exercise_type_id: number;
  name: string;
  description: string;
};

type NewExerciseTemplateItem = {
  workout_template_id: number;
  exercise_id: number;
  value: Prisma.JsonValue;
  order_index: number;
};

export type { NewExerciseType, NewExercise, NewExerciseTemplateItem };
