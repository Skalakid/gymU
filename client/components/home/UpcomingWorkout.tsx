import { StyleSheet, View } from 'react-native';
import React from 'react';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';
import ThemedText from '../ThemedText';
import OpenButton from '../common/OpenButton';
import useTheme from '@/hooks/useTheme';

const UpcomingWorkout = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.dumbell, { backgroundColor: theme.background }]}>
        <Icon icon={Icons.dumbell} size={24} />
      </View>

      <View style={{ flex: 1 }}>
        <ThemedText size="m" weight="medium">
          Workout Name
        </ThemedText>

        <ThemedText size="s" weight="light">
          Level
        </ThemedText>
      </View>

      <OpenButton onPress={() => {}} />
    </View>
  );
};

export default UpcomingWorkout;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  dumbell: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
