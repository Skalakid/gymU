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

export { calculateBMI };
