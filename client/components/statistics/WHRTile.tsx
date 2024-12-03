import fetchApi from '@/api/fetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Tile from '../common/Tile';
import ThemedText from '../ThemedText';
import { roundTwoDecimals } from '@/utils/gauge.utils';

export const WHRTile = () => {
  const [whr, setWhr] = useState<number | null>(null);

  useEffect(() => {
    const getWHR = async () => {
      try {
        const rawData = await fetchApi('/ratios/whr', 'GET');

        if (rawData.ok) {
          const data = await rawData.json();
          setWhr(data.WHR);
        } else {
          setWhr(-1);
        }
      } catch {
        setWhr(-1);
      }
    };

    if (whr === null) {
      getWHR();
    }
  }, [whr]);

  if (whr === null) {
    return <ActivityIndicator />;
  }

  if (whr === -1) {
    return <View />;
  }

  return (
    <Tile style={{ gap: 10 }}>
      <ThemedText weight={'semiBold'} size={'h4'}>
        WHR: {roundTwoDecimals(whr)}
      </ThemedText>

      <ThemedText size={'xl'}>
        {`WHR (waist-to-hip ratio) is an indicator that helps detect abdomenal obesity. Value of WHR should be 1 or less for man and 0.8 or less for woman.`}
      </ThemedText>
    </Tile>
  );
};
