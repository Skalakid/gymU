type BasicExercise = {
  exercise_id: number;
  name: string;
  exercise_type: string;
  body_parts: string[];
  shortDescription: string;
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
  has_series: boolean;
  has_time: boolean;
  has_weights: boolean;
  is_break: boolean;
  name: string;
};
