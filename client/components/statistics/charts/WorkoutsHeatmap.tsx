import { ActivityIndicator, StyleSheet } from 'react-native';
import Heatmap from './ChartTemplates/Heatmap';
import { useEffect, useState } from 'react';
import { getDateSince } from '@/utils/date.utils';
import fetchApi from '@/api/fetch';
import Tile from '../../common/Tile';
import { EventCalendarData } from '@/types/calendar';

type WorkoutsHeatmapProps = {
  title: string;
  months: number;
};

type ChartDataType = {
  date: Date;
  count: number;
};

const WorkoutsHeatmap = ({ title, months }: WorkoutsHeatmapProps) => {
  const [chartData, setChartData] = useState<ChartDataType[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const startDate = getDateSince(months);
      const endDate = new Date();

      try {
        const rawData = await fetchApi(
          `/calendar/grid/${startDate}/${endDate}`,
          'GET',
        );
        const data = await rawData.json();

        const newChartData = data.map((element: EventCalendarData) => {
          return {
            date: element.datetime,
            count: 1,
          };
        });

        setChartData(newChartData);
      } catch {
        setChartData([]);
      }
    };

    if (!chartData) {
      getData();
    }
  }, [months, chartData]);

  return chartData === null ? (
    <ActivityIndicator />
  ) : (
    <Tile style={styles.tile}>
      <Heatmap title={title} data={chartData} months={months} />
    </Tile>
  );
};

export default WorkoutsHeatmap;

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
