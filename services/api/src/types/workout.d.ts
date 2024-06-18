type NewWorkoutTemplate = {
  author_id: number;
  name: string;
  description: string;
  created_at: Date;
  private: boolean;
};

type NewUserWorkout = {
  user_id: number;
  workout_id: number;
  timestamp: Date;
};

export type { NewWorkoutTemplate, NewUserWorkout };
