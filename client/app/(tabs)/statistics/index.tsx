import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Images from '@/constants/Images';
import ThemedText from '@/components/ThemedText';
import useThemeColor from '@/hooks/useThemeColor';
import WorkoutsHeatmap from '@/components/charts/WorkoutsHeatmap';
import { useEffect, useState } from 'react';
import fetchApi from '@/api/fetch';
import Tile from '@/components/common/Tile';
import { ScrollView } from 'react-native';
import { Gauge } from '@/components/gauge/Gauge';

const BMIGauge = () => {
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
    <Tile>
      <Gauge id={'bmi'} minValue={16} maxValue={40} value={18.5} t1={20} />
    </Tile>
  );
};

const StatisticsPage = () => {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'tile');
  const [heatmapInterval] = useState(3);

  return (
    <ScrollView style={styles.container}>
      <Header title={'Statistics'} />

      <Pressable
        onPress={() => router.navigate('/statistics/body')}
        style={[styles.button, { backgroundColor }]}
      >
        <Image
          source={Images.body}
          style={{ width: 200, height: 200, borderRadius: 15 }}
        />
        <ThemedView style={[styles.buttonTextWrapper, { backgroundColor }]}>
          <ThemedText size="xl" weight="semiBold">
            Your body
          </ThemedText>
        </ThemedView>
      </Pressable>

      <WorkoutsHeatmap title="Your workouts" months={heatmapInterval} />

      <BMIGauge />
    </ScrollView>
  );
};

export default StatisticsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  button: {
    width: 230,
    height: 250,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonTextWrapper: {
    width: 200,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
