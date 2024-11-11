import DetailedExerciseItem from '@/components/exercises/DetailedExerciseItem';
import { FlatList, StyleSheet, View } from 'react-native';

type WorkoutExercisesProps = {
  workoutDetails: Workout;
};

const WorkoutExercises = ({ workoutDetails }: WorkoutExercisesProps) => {
  return (
    <FlatList
      style={styles.exerciseList}
      data={workoutDetails.exercises || []}
      renderItem={({ item }) => (
        <DetailedExerciseItem
          name={item.name}
          type={item.exerciseType}
          bodyParts={item.bodyParts}
          activeOpacity={1}
          exerciseDetails={item.value}
        />
      )}
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
