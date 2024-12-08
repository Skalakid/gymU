import { GaugeProps } from '@/types/gauge';
import Tile from '../common/Tile';
import ThemedText from '../ThemedText';
import { GaugeChart } from './GaugeChart';
import { roundTwoDecimals } from '@/utils/gauge.utils';

export const Gauge = ({
  ratio,
  description,
  value,
  minValue,
  maxValue,
  t1,
  t2,
}: GaugeProps) => {
  return (
    <Tile style={{ gap: 10 }}>
      <GaugeChart
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        t1={t1}
        t2={t2}
      />
      <ThemedText weight={'semiBold'} size={'h4'}>
        {ratio}: {roundTwoDecimals(value)}
      </ThemedText>

      <ThemedText size={'xl'}>{description}</ThemedText>
    </Tile>
  );
};
