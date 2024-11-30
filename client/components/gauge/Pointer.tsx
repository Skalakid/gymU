import { PointerProps } from '@/types/gauge';
import { polarToCartesian } from '@/utils/gauge.utils';
import { Line } from 'react-native-svg';

export const Pointer = ({ angle, center, length }: PointerProps) => {
  const outerCoordinates = polarToCartesian(center, length, angle);
  const innerCoordinates = polarToCartesian(center, length * 0.98, angle);

  return (
    <>
      <Line
        x1={center.x}
        y1={center.y}
        x2={outerCoordinates.x}
        y2={outerCoordinates.y}
        stroke={'#000'}
        strokeWidth={5}
      />

      <Line
        x1={center.x}
        y1={center.y}
        x2={innerCoordinates.x}
        y2={innerCoordinates.y}
        stroke={'#fff'}
        strokeWidth={2}
      />
    </>
  );
};
