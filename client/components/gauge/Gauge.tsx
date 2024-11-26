import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import { Pointer } from './Pointer';
import { Dimensions } from 'react-native';

const SVGWidth = Dimensions.get('window').width * 0.9;
const SVGHeight = Dimensions.get('window').height * 0.25;

interface GaugeProps {
  id: string;
  minValue: number;
  maxValue: number;
  value: number;
  t1?: number;
  t2?: number;
}

export const Gauge: React.FC<GaugeProps> = ({
  id,
  minValue,
  maxValue,
  value,
  t1 = 50,
  t2 = 50,
}) => {
  const centerX = SVGWidth / 2;
  const centerY = SVGHeight / 2;
  const radius = SVGHeight / 2;

  const scaleFactors = {
    circle: 0.95,
    pointer: 0.85,
  };

  const range = maxValue - minValue;
  const shiftedValue = value - minValue;
  const percent = shiftedValue / range;
  const angle = 180 * (1 - percent);

  return (
    <Svg height={SVGHeight} width={SVGWidth} style={{ borderWidth: 2 }}>
      <Defs>
        <LinearGradient
          id={`gradient_${id}`}
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <Stop offset="0%" stopColor="blue" />
          <Stop offset={`${t1}%`} stopColor="green" />
          <Stop offset={`${t2}%`} stopColor="green" />
          <Stop offset="100%" stopColor="red" />
        </LinearGradient>
        <ClipPath id={`clip_${id}`}>
          <Rect x="0" y="0" width={SVGWidth} height={SVGHeight / 2} />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#clip_${id})`}>
        <Circle
          cx={SVGWidth / 2}
          cy={SVGHeight / 2}
          r={radius * scaleFactors.circle}
          fill={`url(#gradient_${id})`}
        />
      </G>
      <Pointer
        angle={angle}
        length={radius * scaleFactors.pointer}
        centerX={centerX}
        centerY={centerY}
      />
    </Svg>
  );
};
