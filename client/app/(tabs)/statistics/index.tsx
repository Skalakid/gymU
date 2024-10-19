import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Button, Text, View, StyleSheet } from 'react-native';

const StatisticsPage = () => {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Header title={'Statistics'} />
      <Button
        title="your body"
        onPress={() => {
          router.navigate('/statistics/body');
        }}
      ></Button>
    </ThemedView>
  );
};

export default StatisticsPage;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
