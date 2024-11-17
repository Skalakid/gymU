import { prisma } from '../config/db.server';

async function createMesaurement(
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
  const newMeasurement = await prisma.measurement.create({
    data: {
      userId,
      saveDate,
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

async function getMeasurements(userId: number) {
  const measurements = await prisma.measurement.findMany({
    select: {
      userId: true,
      saveDate: true,
      weight: true,
      biceps: true,
      chest: true,
      waist: true,
      hips: true,
      thigh: true,
      calf: true,
    },
    where: {
      userId: userId,
    },
  });

  return measurements;
}

async function getSelectedMeasurements(
  userId: number,
  selectedMeasurements: string[],
) {
  const measurements = await prisma.measurement.findMany({
    select: {
      userId: true,
      saveDate: true,
      weight: selectedMeasurements.includes('weight'),
      biceps: selectedMeasurements.includes('biceps'),
      chest: selectedMeasurements.includes('chest'),
      waist: selectedMeasurements.includes('waist'),
      hips: selectedMeasurements.includes('hips'),
      thigh: selectedMeasurements.includes('thigh'),
      calf: selectedMeasurements.includes('calf'),
    },
    where: {
      userId: userId,
    },

    orderBy: {
      saveDate: 'asc',
    },
  });

  return measurements;
}

async function getMeasurementsSince(userId: number, timeInterval: number) {
  const measurements = await prisma.measurement.findMany({
    select: {
      userId: true,
      saveDate: true,
      weight: true,
      biceps: true,
      chest: true,
      waist: true,
      hips: true,
      thigh: true,
      calf: true,
    },
    where: {
      userId: userId,
      saveDate: {
        gte: new Date(
          new Date().setMonth(new Date().getMonth() - timeInterval),
        ),
      },
    },
    orderBy: {
      saveDate: 'asc',
    },
  });

  return measurements;
}

async function getSelectedMeasurementsSince(
  userId: number,
  selectedMeasurements: string[],
  timeInterval: number,
) {
  const measurements = await prisma.measurement.findMany({
    select: {
      userId: true,
      saveDate: true,
      weight: selectedMeasurements.includes('weight'),
      biceps: selectedMeasurements.includes('biceps'),
      chest: selectedMeasurements.includes('chest'),
      waist: selectedMeasurements.includes('waist'),
      hips: selectedMeasurements.includes('hips'),
      thigh: selectedMeasurements.includes('thigh'),
      calf: selectedMeasurements.includes('calf'),
    },
    where: {
      userId: userId,
      saveDate: {
        gte: new Date(
          new Date().setMonth(new Date().getMonth() - timeInterval),
        ),
      },
    },
    orderBy: {
      saveDate: 'asc',
    },
  });

  return measurements;
}

export {
  createMesaurement,
  getMeasurements,
  getSelectedMeasurements,
  getMeasurementsSince,
  getSelectedMeasurementsSince,
};
