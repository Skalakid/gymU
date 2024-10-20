import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import Icons from '@/constants/Icons';
import RowTextInput from '../input/RowTextInput';
import { useExerciseContext } from '@/contexts/ExerciseContext';
import PrimaryButton from '../button/PrimaryButton';

type ExerciseDetailsFormProps = {
  type: string;
  onSubmit: (data: any) => void;
  submitButtonStyle?: ViewStyle;
};

const ExerciseDetailsForm = ({
  type,
  onSubmit,
  submitButtonStyle,
}: ExerciseDetailsFormProps) => {
  const { getExerciseType } = useExerciseContext();
  const [exerciseType] = useState<ExerciseType | null>(
    getExerciseType(type) || null,
  );
  const [sets, setSets] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);

  const handleNumericChange = (
    value: number,
    callback: (value: number) => void,
    maxValue: number = 100,
  ) => {
    callback(Math.min(Math.max(value, 0), maxValue));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputFields}>
        {exerciseType?.has_series && (
          <RowTextInput
            value={sets}
            onChageText={(value) => handleNumericChange(value, setSets)}
            label="Sets"
            icon={Icons.repeat}
          />
        )}
        {exerciseType?.has_reps && (
          <RowTextInput
            value={reps}
            onChageText={(value) => handleNumericChange(value, setReps)}
            label="Reps"
            icon={Icons.flame}
          />
        )}
        {exerciseType?.has_weights && (
          <RowTextInput
            value={reps}
            onChageText={(value) => handleNumericChange(value, setReps, 1000)}
            label="Weight"
            icon={Icons.weight}
          />
        )}
        {exerciseType?.has_time && (
          <RowTextInput
            value={reps}
            onChageText={(value) => handleNumericChange(value, setReps)}
            label={exerciseType?.is_break ? 'Break time' : 'Time'}
            icon={Icons.time}
          />
        )}
      </View>
      <PrimaryButton
        value="Add"
        onPress={() => {
          onSubmit({ sets, reps });
        }}
        style={submitButtonStyle}
      />
    </View>
  );
};

export default ExerciseDetailsForm;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  inputFields: {
    gap: 10,
  },
});
