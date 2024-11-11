type DefaultChartProps = {
  title: string;
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
