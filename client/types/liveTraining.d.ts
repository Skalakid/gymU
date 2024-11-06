type TrainingItem = {
  exerciseID: number;
  exerciseIndex: number;
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

type ActionType = 'next' | 'prev';
