type MeasurementData = {
  measurementId: number;
  userId: number;
  saveDate: Date;
  weight: number;
  biceps: number;
  chest: number;
  waist: number;
  hips: number;
  thigh: number;
  calf: number;
};

type Mesaurement =
  | 'weight'
  | 'biceps'
  | 'chest'
  | 'waist'
  | 'hips'
  | 'thigh'
  | 'calf';

export type { MeasurementData, Mesaurement };
