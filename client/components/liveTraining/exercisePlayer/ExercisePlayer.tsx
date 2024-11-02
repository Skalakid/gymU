import { StyleSheet, View } from 'react-native';
import React from 'react';
import IconButton from '@/components/button/IconButton';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';
import ProgressBar from './ProgressBar';

type ExercisePlayerProps = {
  onNext?: () => void;
  onPrevious?: () => void;
  progress: number;
  ticks: number;
};

const ExercisePlayer = ({
  onNext,
  onPrevious,
  progress,
  ticks,
}: ExercisePlayerProps) => {
  const theme = useTheme();

  const handleNext = () => {
    onNext?.();
  };

  const handlePrevious = () => {
    onPrevious?.();
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} ticks={ticks} />
      <View style={styles.buttonController}>
        <IconButton
          icon={Icons.previous}
          size={24}
          style={[styles.button]}
          onPress={handlePrevious}
        />
        <IconButton
          icon={Icons.play}
          size={24}
          style={[
            {
              backgroundColor: theme.tile,
            },
            styles.button,
          ]}
        />
        <IconButton
          icon={Icons.next}
          size={24}
          style={[styles.button]}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default ExercisePlayer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  buttonController: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
