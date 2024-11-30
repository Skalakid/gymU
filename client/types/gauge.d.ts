export interface GaugeProps {
  minValue: number;
  maxValue: number;
  value: number;
  t1: number;
  t2: number;
}

export interface PointerProps {
  angle: number;
  center: Point;
  length: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export type Point = {
  x: number;
  y: number;
};
