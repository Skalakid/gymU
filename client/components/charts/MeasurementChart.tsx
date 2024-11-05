import fetchApi from '@/api/fetch';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import ThemedText from '../ThemedText';
import LineChart from './ChartTemplates/LineChart';
import { extractAverageData, getLabels } from '@/utils/chart.utils';
import { Mesaurement } from '@/types/measurement';

type MeasurementChartProps = {
  measurement: Mesaurement;
  timeInterval: number;
};

type ChartData = {
  labels: string[];
  values: number[];
};

const MeasurementChart = ({
  measurement,
  timeInterval,
}: MeasurementChartProps) => {
  const auth = useAuthContext();
  const [userData, setUserData] = useState<ChartData | null>(null);

  useEffect(() => {
    const getData = async () => {
      const rawData = await fetchApi(
        `/measurement/${auth.user?.user_id}/${timeInterval}`,
        'GET',
      );
      const data = await rawData.json();

      const labels = getLabels(timeInterval);
      const values = extractAverageData(data, measurement, timeInterval);

      setUserData({
        labels,
        values,
      });
    };

    if (!userData) {
      getData();
    }
  }, [auth.user?.user_id, measurement, timeInterval, userData]);

  return userData === null ? (
    <ThemedText>Loading</ThemedText>
  ) : (
    <LineChart
      title={measurement}
      data={{
        labels: userData.labels,
        datasets: [{ data: userData.values }],
      }}
    />
  );
};

export default MeasurementChart;
