import React from 'react';
import ThemedText from '../ThemedText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Tile from '../common/Tile';
import ExerciseDetailsList from './ExerciseDetailsList';

type ExerciseItemProp = {
  exercise: ExerciseItem;
};

const ExerciseItem = ({ exercise }: ExerciseItemProp) => {
  const value: ExerciseDetails | null = exercise.value
    ? JSON.parse(exercise.value)
    : null;

  const isBreak = Object.values(value || {}).length === 1 && !!value?.break;

  return (
    <TouchableOpacity>
      <Tile style={styles.container}>
        <ThemedText size="l" weight="medium">
          {exercise.exercise_name}
        </ThemedText>
        <View style={styles.info}>
          {value && (
            <ExerciseDetailsList
              sets={value.sets}
              reps={value.reps}
              time={value.time}
              weight={value.weight}
              isBreak={isBreak}
            />
          )}
        </View>
      </Tile>
    </TouchableOpacity>
  );
};
export default ExerciseItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    height: 100,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  info: {
    gap: 3,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 5,
  },
  tagList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
