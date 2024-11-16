import { MeasurementData, Mesaurement } from '@/types/measurement';
import { getDateSince } from './date.utils';

const getLabels = (timeInterval: number) => {
  const labels: string[] = [];

  for (let i = 0; i < timeInterval; ++i) {
    const date = getDateSince(i);
    const month = date.toLocaleString('default', { month: 'short' });
    labels.unshift(month);
  }

  return labels;
};

const extractAverageData = (
  data: MeasurementData[],
  key: Mesaurement,
  timeInterval: number,
) => {
  const totalValues = new Array(12).fill(0);
  const counts = new Array(12).fill(0);

  for (let i = 0; i < data.length; ++i) {
    const saveDate = data[i].saveDate;
    const measurement = data[i][key];
    const currentMonth = new Date(saveDate).getMonth();

    totalValues[currentMonth] += measurement;
    counts[currentMonth] += 1;
  }

  for (let i = 0; i < 12; ++i) {
    if (counts[i] === 0) {
      continue;
    }

    totalValues[i] /= counts[i];
  }

  const values = [];
  const startMonth = new Date().getMonth() + 1 - timeInterval;
  let index = startMonth >= 0 ? startMonth : startMonth + 12;

  for (let i = 0; i < timeInterval; ++i) {
    values.push(totalValues[index]);
    index = (index + 1) % 12;
  }

  return values;
};

export { getLabels, extractAverageData };
