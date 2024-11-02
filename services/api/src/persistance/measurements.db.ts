import { prisma } from '../config/db.server';

async function createMesaurement(
  user_id: number,
  weight: number,
  biceps: number,
  chest: number,
  waist: number,
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
      waist,
      hips,
      thigh,
      calf,
    },
  });

  return newMeasurement;
}

async function getMeasurements(user_id: number) {
  const measurements = await prisma.measurement.findMany({
    select: {
      user_id: true,
      weight: true,
      biceps: true,
      chest: true,
      waist: true,
      hips: true,
      thigh: true,
      calf: true,
    },
    where: {
      user_id: user_id,
    },
  });

  return measurements;
}

export { createMesaurement, getMeasurements };
