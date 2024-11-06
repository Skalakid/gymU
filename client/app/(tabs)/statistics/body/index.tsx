import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import Icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

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
        rightIconOnPress={() => router.navigate('/statistics/body/add')}
      />
    </ThemedView>
  );
};

export default BodyMeasurements;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
