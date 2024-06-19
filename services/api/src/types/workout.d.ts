type NewWorkoutTemplate = {
  author_id: number;
  name: string;
  description: string;
  created_at: Date;
  private: boolean;
  workout_level_id: number;
};

type NewUserWorkout = {
  user_id: number;
  workout_id: number;
  timestamp: Date;
};

type WorkoutTag = {
  workout_template_id: number;
  tag_id: number;
};

export type { NewWorkoutTemplate, NewUserWorkout, WorkoutTag };
