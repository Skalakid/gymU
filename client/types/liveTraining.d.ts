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
  imageUrls: string[];
};

type ActionType = 'next' | 'prev';
