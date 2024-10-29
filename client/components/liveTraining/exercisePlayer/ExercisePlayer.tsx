import { StyleSheet, View } from 'react-native';
import React from 'react';
import IconButton from '@/components/button/IconButton';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';
import ProgressBar from './ProgressBar';

type ExercisePlayerProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const ExercisePlayer = ({ onNext, onPrevious }: ExercisePlayerProps) => {
  const theme = useTheme();
  const [progress, setProgress] = React.useState(0);

  const handleNext = () => {
    setProgress(Math.min(progress + 10, 100));
    onNext?.();
  };

  const handlePrevious = () => {
    setProgress(Math.max(progress - 10, 0));
    onPrevious?.();
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
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
