import { prisma } from '../config/db.server';

async function createMesaurement(
  user_id: number,
  weight: number,
  biceps: number,
  chest: number,
  hips: number,
  thigh: number,
  calf: number,
) {
  const newMeasurement = await prisma.measurement.create({
    data: {
      user_id,
      weight,
      biceps,
      chest,
      hips,
      thigh,
      calf,
    },
  });

  return newMeasurement;
}

export { createMesaurement };
