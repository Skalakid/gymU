import { getDateSince } from '@/utils/date.utils';
import { Dimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { differenceInCalendarDays } from 'date-fns';
import { DefaultChartConfig } from '@/constants/Chart';
import { HeatmapProps } from '@/types/charts';
import TitledChart from './TitledChart';

const ChartWidth = Dimensions.get('window').width * 0.9;
const ChartHeight = Dimensions.get('window').height * 0.25;
const ContainerHeight = Dimensions.get('window').height * 0.3;

const Heatmap = ({
  title,
  months,
  data,
  width = ChartWidth,
  height = ChartHeight,
  chartConfig = DefaultChartConfig,
}: HeatmapProps) => {
  const startDate = getDateSince(months);
  const endDate = new Date();
  const days = differenceInCalendarDays(endDate, startDate);

  return (
    <TitledChart title={title} height={ContainerHeight}>
      <ContributionGraph
        values={data}
        numDays={days}
        width={width}
        height={height}
        style={{ alignSelf: 'center' }}
        chartConfig={chartConfig}
        tooltipDataAttrs={() => ({})}
      />
    </TitledChart>
  );
};

export default Heatmap;
