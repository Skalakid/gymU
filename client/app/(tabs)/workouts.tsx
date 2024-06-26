import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import WorkoutForm from '@/components/workoutForm/WorkoutForm';
import { useState } from 'react';
import { Alert, BackHandler, Button, Modal, StyleSheet } from 'react-native';

const WorkoutsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Workouts page</ThemedText>
      <Button
        title="add"
        onPress={() => {
          setModalVisible((prev) => !prev);
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <WorkoutForm />
      </Modal>
    </ThemedView>
  );
};

export default WorkoutsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
