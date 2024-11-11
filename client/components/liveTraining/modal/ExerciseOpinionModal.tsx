import { Modal, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Tile from '@/components/common/Tile';
import OpinionForm from '../opinion/OpinionForm';
import SecondaryButton from '@/components/button/SecondaryButton';
import ThemedText from '@/components/ThemedText';
import DetailedExerciseItem from '@/components/exercises/DetailedExerciseItem';
import { useLiveTrainingContext } from '@/contexts/LiveTrainingContext';
import useTheme from '@/hooks/useTheme';

type ExerciseOpinionModalProps = {
  visible: boolean;
  onClose: (value: number) => void;
  value?: number;
};

const ExerciseOpinionModal = ({
  visible,
  onClose,
}: ExerciseOpinionModalProps) => {
  const theme = useTheme();
  const [value, setValue] = useState<number | null>(null);
  const [exercise, setExercise] = useState<DetailedExerciseItem | null>(null);
  const { currentExerciseIndex, getWorkoutExercise, getExerciseOpinion } =
    useLiveTrainingContext();

  const handleSelection = (value: number) => {
    setValue(value);
  };

  const handleClose = () => {
    if (value === null) {
      return;
    }
    const currentValue = value;
    setValue(null);
    onClose(currentValue);
  };

  useEffect(() => {
    if (!visible) {
      return;
    }
    setExercise(getWorkoutExercise(currentExerciseIndex - 1));
    setValue(getExerciseOpinion(currentExerciseIndex - 1)?.value ?? null);
  }, [currentExerciseIndex, getExerciseOpinion, getWorkoutExercise, visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Tile style={styles.tile}>
          <ThemedText size="l" weight="semiBold">
            How was it?
          </ThemedText>

          {exercise && (
            <DetailedExerciseItem
              name={exercise.name}
              type={exercise.exerciseType}
              bodyParts={exercise.bodyParts}
              exerciseDetails={exercise.value}
              tileStyle={{ backgroundColor: theme.background }}
            />
          )}

          <OpinionForm onSelection={handleSelection} value={value} />

          <SecondaryButton
            value="Save"
            onPress={handleClose}
            disabled={value === null}
          />
        </Tile>
      </View>
    </Modal>
  );
};

export default ExerciseOpinionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: { width: 350, gap: 10 },
});
