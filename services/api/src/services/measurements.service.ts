import * as MesaurementDB from '../persistance/measurements.db';

async function createMeasurement(
  user_id: number,
  save_date: Date,
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
    save_date,
    weight,
    biceps,
    chest,
    waist,
    hips,
    thigh,
    calf,
  );
}

async function getMeasurements(user_id: number) {
  return await MesaurementDB.getMeasurements(user_id);
}

async function getMeasurementsSince(user_id: number, time_interval: number) {
  return await MesaurementDB.getMeasurementsSince(user_id, time_interval);
}

export { createMeasurement, getMeasurements, getMeasurementsSince };
