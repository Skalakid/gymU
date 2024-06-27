import fetchApi from '@/api/fetch';
import ExerciseItem from '@/components/exercises/ExerciseItem';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const WorkoutDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [workoutDetails, setWorkoutDetails] = useState<Workout | null>(null);

  const getWorkoutDetails = useCallback(async () => {
    try {
      const response = await fetchApi(`/workout/${id}`, 'GET');
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const workoutDetails = await response.json();
      setWorkoutDetails(workoutDetails);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getWorkoutDetails();
  }, [getWorkoutDetails]);

  return (
    <FlatList
      style={styles.exerciseList}
      data={workoutDetails?.exercises || []}
      renderItem={({ item }) => <ExerciseItem exercise={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
    />
  );
};

export default WorkoutDetailsPage;

const styles = StyleSheet.create({
  exerciseList: {
    gap: 10,
  },
});
