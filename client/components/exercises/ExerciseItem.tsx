import React from 'react';
import ThemedText from '../ThemedText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';
import Tile from '../common/Tile';
import useTheme from '@/hooks/useTheme';

type ExerciseItemProp = {
  exercise: ExerciseItem;
};

type ExerciseValue = {
  series?: number;
  reps?: number;
  break?: number;
  time?: number;
  weight?: number;
};

const ExerciseItem = ({ exercise }: ExerciseItemProp) => {
  const theme = useTheme();

  const value: ExerciseValue | null = exercise.value
    ? JSON.parse(exercise.value)
    : null;

  const isBreak = Object.values(value || {}).length === 1 && value?.break;

  return (
    <TouchableOpacity>
      <Tile style={styles.container}>
        <ThemedText size="l" weight="medium">
          {exercise.exercise_name}
        </ThemedText>
        <View style={styles.info}>
          {(value?.series || value?.reps) && (
            <View style={styles.row}>
              <Icon icon={Icons.repeat} size={14} color={theme.text} />
              <ThemedText size="s">
                {value.series} series • {value.reps} reps
              </ThemedText>
            </View>
          )}

          {value?.weight && (
            <View style={styles.row}>
              <Icon icon={Icons.weight} size={14} color={theme.text} />
              <ThemedText size="s">{value.weight} kg</ThemedText>
            </View>
          )}

          {(value?.time || isBreak) && (
            <View style={styles.row}>
              <Icon icon={Icons.time} size={14} color={theme.text} />
              <ThemedText size="s">
                {value?.time || (isBreak && value.break) || '~'} seconds
              </ThemedText>
            </View>
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
