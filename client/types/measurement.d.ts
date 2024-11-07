type MeasurementData = {
  mesaurement_id: number;
  user_id: number;
  save_date: Date;
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
