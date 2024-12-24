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
  imageUrls?: string[];
};

type ExerciseItem = {
  exerciseId: number;
  exerciseName: string;
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

type ProgressTarget = 'sets' | 'reps' | 'weight' | 'time';

type ProgressType = 'none' | 'linear' | 'sigmoidal';

type NoneProgressType = {
  type: 'none';
};

type LinearProgressType = {
  type: 'linear';
  interval: number;
  difference: number;
  maxValue?: number;
  maxOccurences?: number;
  target: ProgressTarget;
};

type ProgressConfig = {
  type: ProgressType;
} & (NoneProgressType | LinearProgressType);

type DetailedExerciseItem = DetailedExercise & {
  progress: ProgressConfig;
  value: ExerciseDetails;
  itemId?: number;
};

type OrderedExerciseItem = DetailedExerciseItem & {
  orderIndex: number;
};
