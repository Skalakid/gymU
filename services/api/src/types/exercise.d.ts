type NewExerciseType = {
  name: string;
  hasReps: boolean;
  hasSets: boolean;
  hasWeights: boolean;
  hasTime: boolean;
  isBreak: boolean;
};

type NewExercise = {
  exerciseTypeId: number;
  name: string;
  description: string;
  bodyParts: string[];
};

type BasicExercise = {
  exerciseId: number;
  name: string;
  exerciseType: string;
  bodyParts: string[];
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
  exerciseId: number;
  name: string;
  exerciseType: string;
  bodyParts: string[];
  value?: ExerciseDetails;
  description?: string;
  orderIndex?: number;
};

type NewExerciseTemplateItem = {
  workoutTemplateId: number;
  exerciseId: number;
  value: Prisma.JsonValue;
  orderIndex: number;
};

export type {
  NewExerciseType,
  NewExercise,
  NewExerciseTemplateItem,
  BasicExercise,
  DetailedExercise,
};
