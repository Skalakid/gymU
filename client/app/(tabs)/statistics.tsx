import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

const StatisticsPage = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Statistics page</ThemedText>
    </ThemedView>
  );
};

export default StatisticsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
