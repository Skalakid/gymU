import ThemedText from '@/components/ThemedText';
import TextInput from '@/components/input/TextInput';
import ThemedView from '@/components/ThemedView';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const WorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <ThemedView style={styles.container}>
      <TextInput
        label="Workout name"
        placeholder="Enter workout name..."
        onChangeText={(text) => setWorkoutName(text)}
        value={workoutName}
      />
      <TextInput
        label="Description"
        placeholder="Enter workout description..."
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
    </ThemedView>
  );
};

export default WorkoutForm;

const styles = StyleSheet.create({
  container: {
    top: 500,
  },
});
