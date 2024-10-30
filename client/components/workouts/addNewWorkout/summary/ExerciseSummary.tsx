import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import DetailedExerciseItem from '@/components/exercises/DetailedExerciseItem';

type ExerciseSummaryProps = {
  exercises: OrderedExerciseItem[];
};

const ExerciseSummary = ({ exercises }: ExerciseSummaryProps) => {
  return (
    <FlatList
      style={styles.exerciseList}
      data={exercises ?? []}
      renderItem={({ item, index }) => (
        <DetailedExerciseItem
          key={`summary${item.name}${index}${item.orderIndex}`}
          name={item.name}
          type={item.exercise_type}
          bodyParts={item.body_parts}
          description={item.description}
          activeOpacity={1}
          exerciseDetails={item.value}
          style={styles.spearator}
        />
      )}
    />
  );
};

export default ExerciseSummary;

const styles = StyleSheet.create({
  exerciseList: {
    flex: 1,
  },
  spearator: {
    marginBottom: 20,
  },
});
