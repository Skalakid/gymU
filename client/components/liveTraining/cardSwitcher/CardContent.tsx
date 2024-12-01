import { StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/common/Icon';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';
import { useExerciseContext } from '@/contexts/ExerciseContext';
import ImageCarousel from '@/components/imageCarousel/ImageCarousel';

type CardContentProps = {
  trainingItem: TrainingItem;
  index: number;
  dataLength: number;
  nextCardName: string;
};

const CardContent = ({
  trainingItem,
  index = 0,
  dataLength = 0,
  nextCardName,
}: CardContentProps) => {
  const { getExerciseTypeIcon } = useExerciseContext();
  const theme = useTheme();

  const renderGoal = () => {
    let text = '';

    switch (trainingItem.type) {
      case 'time':
      case 'break':
        text = `${trainingItem.value.time} s`;
        break;
      case 'reps':
        text = `${trainingItem.value.reps} reps`;
        break;
      default:
        text = `${trainingItem.value.reps} reps`;
        break;
    }

    if (trainingItem.value.weight) {
      text += ` • ${trainingItem.value.weight} kg`;
    }

    return text;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Icon icon={getExerciseTypeIcon(trainingItem.type)} size={20} />
          <ThemedText size="m" weight="medium">
            Exercise: {index}/{dataLength}
          </ThemedText>
        </View>

        {trainingItem.value.sets > 0 && (
          <View style={styles.row}>
            <ThemedText size="m" weight="medium">
              Set: {trainingItem.value.sets}
            </ThemedText>
            <Icon icon={Icons.repeat} size={20} />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <ImageCarousel imageUrls={trainingItem.imageUrls} />

        <View style={styles.exerciseInfo}>
          <ThemedText size="l" weight="semiBold">
            {trainingItem.name}
          </ThemedText>
          <ThemedText size="m" weight="medium">
            Your goal
          </ThemedText>
          <ThemedText size="x4l" weight="bold" style={{ textAlign: 'center' }}>
            {renderGoal()}
          </ThemedText>
        </View>
      </View>

      {nextCardName && (
        <View style={styles.footer}>
          <View style={styles.nextExercisePreview}>
            <ThemedText size="m">Coming up next...</ThemedText>
            <ThemedText size="s" color={theme.description}>
              {nextCardName}
            </ThemedText>
          </View>
        </View>
      )}
    </View>
  );
};

export default CardContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
    gap: 20,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseInfo: {
    flex: 1,
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
