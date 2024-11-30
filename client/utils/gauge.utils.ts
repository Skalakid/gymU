import { Point } from '@/types/gauge';

export const polarToCartesian = (
  center: Point,
  radius: number,
  angle: number,
): Point => {
  const rad = (Math.PI / 180) * angle;

  return {
    x: center.x + radius * Math.cos(rad),
    y: center.y + radius * Math.sin(rad),
  };
};

export const calculateAngle = (
  value: number,
  minValue: number,
  maxValue: number,
) => {
  const shiftedValue = value - minValue;
  const range = maxValue - minValue;
  const angleShiftValue = 180;
  const totalRangeInAngles = 180;

  return totalRangeInAngles * (shiftedValue / range) + angleShiftValue;
};

export const createSlicePath = (
  center: Point,
  radius: number,
  startAngle: number,
  endAngle: number,
  scaleFactor: number,
) => {
  const start = polarToCartesian(center, radius * scaleFactor, startAngle);
  const end = polarToCartesian(center, radius * scaleFactor, endAngle);

  return `
      M ${center.x} ${center.y} 
      L ${start.x} ${start.y} 
      A ${radius} ${radius} 0 0 1 ${end.x} ${end.y} 
      Z
    `;
};
