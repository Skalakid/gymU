import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

const WorkoutsPage = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Your workouts page</ThemedText>
    </ThemedView>
  );
};

export default WorkoutsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
