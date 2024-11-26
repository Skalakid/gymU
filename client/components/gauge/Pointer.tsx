import { Line } from 'react-native-svg';

interface PointerProps {
  angle: number;
  centerX: number;
  centerY: number;
  length: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export const Pointer: React.FC<PointerProps> = ({
  angle,
  centerX,
  centerY,
  length,
  strokeColor = '#000',
  strokeWidth = 2,
}) => {
  const angleRad = (angle * Math.PI) / 180;

  const x2 = centerX + length * Math.cos(angleRad);
  const y2 = centerY - length * Math.sin(angleRad);

  return (
    <Line
      x1={centerX}
      y1={centerY}
      x2={x2}
      y2={y2}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    />
  );
};
