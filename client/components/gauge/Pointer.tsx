import { PointerProps } from '@/types/gauge';
import { polarToCartesian } from '@/utils/gauge.utils';
import { Line } from 'react-native-svg';

export const Pointer = ({
  angle,
  center,
  length,
  strokeColor = '#000',
  strokeWidth = 2,
}: PointerProps) => {
  const { x, y } = polarToCartesian(center, length, angle);

  return (
    <Line
      x1={center.x}
      y1={center.y}
      x2={x}
      y2={y}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    />
  );
};
