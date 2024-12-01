export type GaugeProps = {
  ratio: string;
  description: string;
  value: number;
  minValue: number;
  maxValue: number;
  t1: number;
  t2: number;
};

export interface GaugeChartProps {
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
}

export type Point = {
  x: number;
  y: number;
};
