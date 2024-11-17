import { DefaultChartConfig } from '@/constants/Chart';
import { LineChartProps } from '@/types/charts';
import { Dimensions } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';
import TitledChart from './TitledChart';

const ChartWidth = Dimensions.get('window').width * 0.9;
const ChartHeight = Dimensions.get('window').height * 0.2;
const ContainerHeight = Dimensions.get('window').height * 0.26;

const LineChart = ({
  title,
  data,
  width = ChartWidth,
  height = ChartHeight,
  chartConfig = DefaultChartConfig,
}: LineChartProps) => {
  const pointsToHide = data.datasets[0].data
    .map((value: number, index: number) => (value === 0 ? index : -1))
    .filter((value: number) => value !== -1);

  return (
    <TitledChart title={title} height={ContainerHeight}>
      <RNLineChart
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        withHorizontalLines={false}
        withVerticalLines={false}
        verticalLabelRotation={-30}
        hidePointsAtIndex={pointsToHide}
      />
    </TitledChart>
  );
};

export default LineChart;
