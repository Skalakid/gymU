import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Images from '@/constants/Images';
import ThemedText from '@/components/ThemedText';
import useThemeColor from '@/hooks/useThemeColor';
import WorkoutsHeatmap from '@/components/statistics/charts/WorkoutsHeatmap';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { BMIGauge } from '@/components/statistics/BMIGauge';
import { WHRTile } from '@/components/statistics/WHRTile';
import { WHtRGauge } from '@/components/statistics/WHtRGauge';
import { BIGauge } from '@/components/statistics/BrocaGauge';
import { BMRTile } from '@/components/statistics/BMRTile';

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
      <WHRTile />
      <WHtRGauge />
      <BIGauge />
      <BMRTile />
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
