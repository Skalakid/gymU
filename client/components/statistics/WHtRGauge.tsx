import fetchApi from '@/api/fetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Gauge } from './gauge/Gauge';

export const WHtRGauge = () => {
  const [whtr, setWhtr] = useState<number | null>(null);

  useEffect(() => {
    const getWHtR = async () => {
      try {
        const rawData = await fetchApi('/ratios/whtr', 'GET');

        if (rawData.ok) {
          const data = await rawData.json();
          setWhtr(data.WHtR);
        } else {
          setWhtr(-1);
        }
      } catch {
        setWhtr(-1);
      }
    };

    if (whtr === null) {
      getWHtR();
    }
  }, [whtr]);

  if (whtr === null) {
    return <ActivityIndicator />;
  }

  if (whtr === -1) {
    return <View />;
  }

  return (
    <Gauge
      ratio={'WHtR'}
      description={`WHtR (waist-to-height ratio) measures distribution of body fat. The higher the ratio, the higher the risk of cardiovcascular diseases. This value should be between 0.4 and 0.5.`}
      minValue={0}
      maxValue={1}
      value={whtr}
      t1={0.4}
      t2={0.5}
    />
  );
};
