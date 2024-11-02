import * as MesaurementDB from '../persistance/measurements.db';

async function createMeasurement(
  user_id: number,
  weight: number,
  biceps: number,
  chest: number,
  waist: number,
  hips: number,
  thigh: number,
  calf: number,
) {
  return await MesaurementDB.createMesaurement(
    user_id,
    weight,
    biceps,
    chest,
    waist,
    hips,
    thigh,
    calf,
  );
}

export { createMeasurement };
