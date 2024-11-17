type DefaultChartProps = {
  title: string;
  // For now every chart has different data set, so it is easier to mark it as any
  // eslint-disable-next-line
  data: any;

  width?: number;
  height?: number;

  // react-native-chart-kit does not export this type
  // eslint-disable-next-line
  chartConfig?: any;
};

export interface HeatmapProps extends DefaultChartProps {
  months: number;
}

export interface LineChartProps extends DefaultChartProps {}
