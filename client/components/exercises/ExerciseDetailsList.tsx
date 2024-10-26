import { StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedText from '../ThemedText';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';

const ExerciseDetailsList = ({
  sets,
  reps,
  time,
  weight,
  breakTime,
  isBreak,
}: ExerciseDetails) => {
  const theme = useTheme();

  return (
    <View>
      {(sets || reps) && (
        <View style={styles.row}>
          <Icon icon={Icons.repeat} size={14} color={theme.text} />
          <ThemedText size="s">
            {sets} sets {reps && `• ${reps} reps`}{' '}
            {breakTime && `• ${breakTime}s break`}
          </ThemedText>
        </View>
      )}

      {weight && (
        <View style={styles.row}>
          <Icon icon={Icons.weight} size={14} color={theme.text} />
          <ThemedText size="s">{weight} kg</ThemedText>
        </View>
      )}

      {(time || isBreak) && (
        <View style={styles.row}>
          <Icon icon={Icons.time} size={14} color={theme.text} />
          <ThemedText size="s">
            {time || (isBreak && isBreak) || '~'} seconds
          </ThemedText>
        </View>
      )}
    </View>
  );
};

export default ExerciseDetailsList;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 5,
  },
});
