import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import WorkoutForm from '@/components/workoutForm/WorkoutForm';
import { useState } from 'react';
import { Alert, BackHandler, Button, Modal, StyleSheet } from 'react-native';

const WorkoutsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
