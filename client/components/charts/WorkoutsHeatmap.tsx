import { ActivityIndicator, StyleSheet } from 'react-native';
import Heatmap from './ChartTemplates/Heatmap';
import { useEffect, useState } from 'react';
import { getDateSince } from '@/utils/date.utils';
import fetchApi from '@/api/fetch';
import Tile from '../common/Tile';
import { EventCalendarData } from '@/types/calendar';

type WorkoutsHeatmapProps = {
  title: string;
  months: number;
};

const WorkoutsHeatmap = ({ title, months }: WorkoutsHeatmapProps) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const startDate = getDateSince(months);
      const endDate = new Date();

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
    };

    if (!chartData) {
      getData();
    }
  }, [months, chartData]);

  return !chartData ? (
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
