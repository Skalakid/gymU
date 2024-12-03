import fetchApi from '@/api/fetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Gauge } from './gauge/Gauge';

export const BIGauge = () => {
  const [bi, setBi] = useState<number | null>(null);
  const [t1, setT1] = useState<number>(-1);
  const [t2, setT2] = useState<number>(-1);

  const lowerBmiThreshold = 18.5;
  const upperBmiThreshold = 25;

  useEffect(() => {
    const getBI = async () => {
      try {
        const biRawData = await fetchApi('/ratios/brocaIndex', 'GET');

        if (!biRawData.ok) {
          setBi(-1);
          return;
        }

        const biData = await biRawData.json();

        const heightRawData = await fetchApi('/user/height', 'GET');

        if (!heightRawData.ok) {
          setBi(-1);
          return;
        }

        const heightData = await heightRawData.json();
        const heightInMeters = heightData.height / 100;
        const heightSquared = heightInMeters * heightInMeters;

        setBi(biData.BrocaIndex);
        setT1(lowerBmiThreshold * heightSquared);
        setT2(upperBmiThreshold * heightSquared);
      } catch {
        setBi(-1);
      }
    };

    if (bi === null) {
      getBI();
    }
  }, [bi]);

  if (bi === null) {
    return <ActivityIndicator />;
  }

  if (bi === -1) {
    return <View />;
  }

  return (
    <Gauge
      ratio={'Broca Index'}
      description={`Broca Index represents ideal body weight. It is calculated based on height.`}
      minValue={0}
      maxValue={150}
      value={bi}
      t1={t1}
      t2={t2}
    />
  );
};
