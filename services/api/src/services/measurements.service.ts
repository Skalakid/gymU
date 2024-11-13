import * as MesaurementDB from '../persistance/measurements.db';

async function createMeasurement(
  userId: number,
  saveDate: Date,
  weight: number,
  biceps: number,
  chest: number,
  waist: number,
  hips: number,
  thigh: number,
  calf: number,
) {
  return await MesaurementDB.createMesaurement(
    userId,
    saveDate,
    weight,
    biceps,
    chest,
    waist,
    hips,
    thigh,
    calf,
  );
}

async function getMeasurements(userId: number) {
  return await MesaurementDB.getMeasurements(userId);
}

async function getMeasurementsSince(userId: number, timeInterval: number) {
  return await MesaurementDB.getMeasurementsSince(userId, timeInterval);
}

export { createMeasurement, getMeasurements, getMeasurementsSince };
