type TrainingItem = {
  exerciseID: number;
  name: string;
  value: {
    sets: number;
    reps: number;
    weight: number;
    time: number;
    isBreak: boolean;
  };
  type: string;
};
