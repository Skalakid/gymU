import * as MesaurementDB from '../persistance/measurements.db';

async function createMeasurement(
  user_id: number,
  weight: number,
  biceps: number,
  chest: number,
  hips: number,
  thigh: number,
  calf: number,
) {
  return await MesaurementDB.createMesaurement(
    user_id,
    weight,
    biceps,
    chest,
    hips,
    thigh,
    calf,
  );
}

export { createMeasurement };
