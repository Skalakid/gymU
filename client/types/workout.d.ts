type WorkoutType = {
  tag_id: number;
  name: string;
};

type Workout = {
  workout_id: number;
  name: string;
  description: string;
  created_at: string;
  private: boolean;
  workout_tags: string[];
  author: {
    user_id: number;
    username: string;
  };
  workout_level: string;
  exercises: ExerciseItem[];
};
