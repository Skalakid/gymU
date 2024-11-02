type MeasurementData = {
  mesaurement_id: number;
  user_id: number;
  weight: number;
  biceps: number;
  chest: number;
  waist: number;
  hips: number;
  thigh: number;
  calf: number;
};

type Mesaurements =
  | 'weight'
  | 'biceps'
  | 'chest'
  | 'waist'
  | 'hips'
  | 'thigh'
  | 'calf';

export type { MeasurementData, Mesaurements };
