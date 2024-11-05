import fetchApi from '@/api/fetch';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import ThemedText from '../ThemedText';
import LineChart from './ChartTemplates/LineChart';
import { extractAverageData, getLabels } from '@/utils/chart.utils';

type WeightChartProps = {
  timeInterval: number;
};

type ChartData = {
  labels: string[];
  values: number[];
};

const WeightChart = ({ timeInterval }: WeightChartProps) => {
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
      const values = extractAverageData(data, 'weight', timeInterval);

      setUserData({
        labels,
        values,
      });
    };

    if (!userData) {
      getData();
    }
  }, []);

  return userData === null ? (
    <ThemedText>Loading</ThemedText>
  ) : (
    <LineChart
      title={'weight'}
      data={{
        labels: userData.labels,
        datasets: [{ data: userData.values }],
      }}
    />
  );
};

export default WeightChart;
