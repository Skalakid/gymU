import fetchApi from '@/api/fetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Gauge } from './gauge/Gauge';

export const BMIGauge = () => {
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    const getBMI = async () => {
      try {
        const rawData = await fetchApi('/ratios/bmi', 'GET');

        if (rawData.ok) {
          const data = await rawData.json();
          setBmi(data.BMI);
        } else {
          setBmi(-1);
        }
      } catch {
        setBmi(-1);
      }
    };

    if (bmi === null) {
      getBMI();
    }
  }, [bmi]);

  if (bmi === null) {
    return <ActivityIndicator />;
  }

  if (bmi === -1) {
    return <View />;
  }

  return (
    <Gauge
      ratio={'BMI'}
      description={`BMI is a ratio of your weight to your height. It can quickly tell if you're in good shape, weigh too little, or should lose some weight. BMI value should be between 18.5 and 25`}
      minValue={16}
      maxValue={40}
      value={bmi}
      t1={18.5}
      t2={25}
    />
  );
};
