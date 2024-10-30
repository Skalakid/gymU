import { StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/common/Icon';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';
import NoImage from '@/components/common/NoImage';

type CardContentProps = {
  trainingItem: TrainingItem;
};

const CardContent = ({ trainingItem }: CardContentProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Icon icon={Icons.dumbell} size={20} />
          <ThemedText size="m" weight="medium">
            Exercise: 0/10
          </ThemedText>
        </View>

        <View style={styles.row}>
          <ThemedText size="m" weight="medium">
            Sets: 0
          </ThemedText>
          <Icon icon={Icons.repeat} size={20} />
        </View>
      </View>
      <View style={styles.content}>
        <NoImage iconSize={150} style={styles.imageContainer} />

        <View style={styles.exerciseInfo}>
          <ThemedText size="l" weight="semiBold">
            Exercise Name
          </ThemedText>
          <ThemedText size="m" weight="medium">
            Your goal
          </ThemedText>
          <ThemedText size="x4l" weight="bold" style={{ textAlign: 'center' }}>
            15 reps
          </ThemedText>
        </View>
      </View>

      <View style={styles.footer}>
        <Icon icon={Icons.image} size={44} />
        <View style={styles.nextExercisePreview}>
          <ThemedText size="m">Coming up next...</ThemedText>
          <ThemedText size="s" color={theme.description}>
            New exercise name
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default CardContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  content: {
    flex: 1,
    gap: 10,
  },
  imageContainer: {
    borderRadius: 15,
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseInfo: {
    gap: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  nextExercisePreview: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
