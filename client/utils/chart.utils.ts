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
  const values = new Array(timeInterval).fill(0);
  const counts = new Array(timeInterval).fill(0);

  let index = 0;
  let lastMonth;

  for (let i = 0; i < data.length; ++i) {
    const saveDate = data[i].save_date;
    const measurement = data[i][key];

    const currentMonth = new Date(saveDate).getMonth();

    if (i === 0) {
      lastMonth = currentMonth;
    } else if (currentMonth !== lastMonth) {
      let diff = currentMonth - lastMonth!;

      if (diff < 0) {
        diff += 12;
      }

      index += diff;
      lastMonth = currentMonth;
    }

    values[index] += measurement;
    counts[index] += 1;
  }

  for (let i = 0; i < timeInterval; ++i) {
    if (counts[i] === 0) {
      continue;
    }

    values[i] /= counts[i];
  }

  return values;
};

export { getLabels, extractAverageData };
