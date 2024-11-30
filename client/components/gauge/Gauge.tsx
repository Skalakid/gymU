import Svg, { Path } from 'react-native-svg';
import { Pointer } from './Pointer';
import { Dimensions } from 'react-native';
import { GaugeColors } from '@/constants/Colors';
import { GaugeProps } from '@/types/gauge';
import { calculateAngle, createSlicePath } from '@/utils/gauge.utils';

const SVGWidth = Dimensions.get('window').width * 0.9;
const SVGHeight = Dimensions.get('window').height * 0.25;

const center = {
  x: SVGWidth / 2,
  y: SVGHeight / 2,
};
const radius = SVGHeight / 2;

const scaleFactors = {
  circle: 0.95,
  pointer: 0.7,
};

export const Gauge = ({ minValue, maxValue, value, t1, t2 }: GaugeProps) => {
  const pointerAngle = calculateAngle(value, minValue, maxValue);
  const t1Angle = calculateAngle(t1, minValue, maxValue);
  const t2Angle = calculateAngle(t2, minValue, maxValue);

  const angles = [
    { start: 180, end: t1Angle },
    { start: t1Angle, end: t2Angle },
    { start: t2Angle, end: 360 },
  ];

  return (
    <Svg height={SVGHeight} width={SVGWidth} style={{ borderWidth: 2 }}>
      {angles.map((value, index) => (
        <Path
          key={index}
          d={createSlicePath(
            center,
            radius,
            value.start,
            value.end,
            scaleFactors.circle,
          )}
          fill={GaugeColors[index]}
        />
      ))}

      <Pointer
        angle={pointerAngle}
        length={radius * scaleFactors.pointer}
        center={center}
      />
    </Svg>
  );
};
