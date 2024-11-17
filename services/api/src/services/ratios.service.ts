import * as RatiosDB from '../persistance/ratios.db';
import * as UserDB from '../persistance/user.db';
import * as MeasurementDB from '../persistance/measurements.db';

async function calculateBMI(userId: number) {
  const heightData = await UserDB.getUserHeight(userId);
  const weightData = await MeasurementDB.getBodyPartsMeasurements(userId, [
    'weight',
  ]);

  if (!heightData?.height || weightData.length === 0) {
    return -1;
  }

  const heightInMeters = heightData?.height / 100;
  const weight = weightData[weightData.length - 1].weight;

  const BMI = weight / (heightInMeters * heightInMeters);

  return BMI;
}

async function calculateWHR(userId: number) {
  const data = await MeasurementDB.getBodyPartsMeasurements(userId, [
    'waist',
    'hips',
  ]);

  if (data.length === 0) {
    return -1;
  }

  const { waist, hips } = data[data.length - 1];

  return waist / hips;
}

async function calculateWHtR(userId: number) {
  const heightData = await UserDB.getUserHeight(userId);
  const waistData = await MeasurementDB.getBodyPartsMeasurements(userId, [
    'waist',
  ]);

  if (!heightData?.height || waistData.length === 0) {
    return -1;
  }

  const waist = waistData[waistData.length - 1].waist;

  return waist / heightData.height;
}

export { calculateBMI, calculateWHR, calculateWHtR };
