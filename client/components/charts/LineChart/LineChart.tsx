import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';

type LineChartProps = {
  title: string;
  data: any;
  width?: number;
  height?: number;
  chartConfig?: any;
};

const DefaultChartConfig = {
  // Remove background color
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  // Set main color to primary orange
  color: (opacity = 1) => `rgba(240, 99, 18, ${opacity})`,
};

const ChartWidth = Dimensions.get('window').width * 0.9;
const ChartHeight = Dimensions.get('window').height * 0.2;

const LineChart = ({
  title,
  data,
  width = ChartWidth,
  height = ChartHeight,
  chartConfig = DefaultChartConfig,
}: LineChartProps) => {
  return (
    <ThemedView style={[styles.container]}>
      <ThemedText size="xl" weight="semiBold">
        {title}
      </ThemedText>
      <RNLineChart
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        withHorizontalLines={false}
        withVerticalLines={false}
        verticalLabelRotation={-30}
      />
    </ThemedView>
  );
};

export default LineChart;

const styles = StyleSheet.create({
  container: {
    height: '35%',
    width: '95%',

    padding: 5,
    gap: 10,
  },
});
