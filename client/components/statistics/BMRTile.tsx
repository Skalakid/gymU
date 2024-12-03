import fetchApi from '@/api/fetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Tile from '../common/Tile';
import ThemedText from '../ThemedText';
import { roundTwoDecimals } from '@/utils/gauge.utils';

export const BMRTile = () => {
  const [bmr, setBmr] = useState<number | null>(null);

  useEffect(() => {
    const getBMR = async () => {
      try {
        const rawData = await fetchApi('/ratios/bmr', 'GET');

        if (rawData.ok) {
          const data = await rawData.json();
          setBmr(data.BMR);
        } else {
          setBmr(-1);
        }
      } catch {
        setBmr(-1);
      }
    };

    if (bmr === null) {
      getBMR();
    }
  }, [bmr]);

  if (bmr === null) {
    return <ActivityIndicator />;
  }

  if (bmr === -1) {
    return <View />;
  }

  return (
    <Tile style={{ gap: 10 }}>
      <ThemedText weight={'semiBold'} size={'h4'}>
        BMR: {roundTwoDecimals(bmr)}kcal
      </ThemedText>

      <ThemedText size={'xl'}>
        {`BMR (Basal Metabolic Rate) indicates your daily energy requirement.`}
      </ThemedText>
    </Tile>
  );
};
