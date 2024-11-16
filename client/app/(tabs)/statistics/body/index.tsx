import fetchApi from '@/api/fetch';
import MeasurementChart from '@/components/charts/MeasurementChart';
import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import Icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';

const BodyMeasurements = () => {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Header
        title={'Your body'}
        leftIcon={Icons.arrowLeft}
        leftIconSize={32}
        leftIconOnPress={() => router.back()}
        rightIcon={Icons.circleAdd}
        rightIconSize={26}
        rightIconOnPress={async () => {
          const height = await fetchApi('/user/height', 'GET');
          router.navigate(`/statistics/body/add${height ? '/height' : ''}`);
        }}
      />

      <ScrollView contentContainerStyle={styles.chartContainers}>
        <MeasurementChart measurement="weight" timeInterval={12} />
        <MeasurementChart measurement="biceps" timeInterval={12} />
        <MeasurementChart measurement="chest" timeInterval={12} />
        <MeasurementChart measurement="hips" timeInterval={12} />
        <MeasurementChart measurement="thigh" timeInterval={12} />
      </ScrollView>
    </ThemedView>
  );
};

export default BodyMeasurements;

const styles = StyleSheet.create({
  container: { flex: 1 },
  chartContainers: {
    alignItems: 'center',
    gap: 20,
  },
});
