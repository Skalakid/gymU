import ExerciseItem from '@/components/exercises/ExerciseItem';
import { FlatList, StyleSheet, View } from 'react-native';

type WorkoutExercisesProps = {
  workoutDetails: Workout;
};

const WorkoutExercises = ({ workoutDetails }: WorkoutExercisesProps) => {
  return (
    <FlatList
      style={styles.exerciseList}
      data={workoutDetails.exercises || []}
      renderItem={({ item }) => <ExerciseItem exercise={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
    />
  );
};

export default WorkoutExercises;

const styles = StyleSheet.create({
  exerciseList: {
    gap: 10,
  },
});
