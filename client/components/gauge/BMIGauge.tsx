import fetchApi from '@/api/fetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Gauge } from './Gauge';

export const BMIGauge = () => {
  const [bmi, setBmi] = useState(null);

  useEffect(() => {
    const getBMI = async () => {
      try {
        const rawData = await fetchApi('/ratios/bmi', 'GET');
        const data = await rawData.json();

        setBmi(data.BMI);
      } catch {}
    };

    if (bmi === null) {
      getBMI();
    }
  }, []);

  return bmi === null ? (
    <ActivityIndicator />
  ) : (
    <Gauge
      ratio={'BMI'}
      description={`BMI is a ratio of your weight to your height. It can quickly tell if you're in good shape, weigh too little, or should lose some weight.`}
      minValue={16}
      maxValue={40}
      value={18.5}
      t1={17}
      t2={25}
    />
  );
};
