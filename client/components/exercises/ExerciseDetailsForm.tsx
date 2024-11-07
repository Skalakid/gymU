import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icons from '@/constants/Icons';
import RowTextInput from '../input/RowTextInput';
import { useExerciseContext } from '@/contexts/ExerciseContext';

type ExerciseDetailsFormProps = {
  type: string;
  onFormUpdate: (details: ExerciseDetails) => void;
  defaultSets?: number;
  defaultReps?: number;
  defaultWeight?: number;
  defaultTime?: number;
  defaultBreakTime?: number;
};

const ExerciseDetailsForm = ({
  type,
  onFormUpdate,
  defaultSets = 3,
  defaultReps = 10,
  defaultWeight = 30,
  defaultTime = 60,
  defaultBreakTime = 60,
}: ExerciseDetailsFormProps) => {
  const { getExerciseType } = useExerciseContext();
  const [exerciseType] = useState<ExerciseType | null>(
    getExerciseType(type) || null,
  );
  const [sets, setSets] = useState<number>(defaultSets);
  const [reps, setReps] = useState<number>(defaultReps);
  const [weight, setWeight] = useState<number>(defaultWeight);
  const [time, setTime] = useState<number>(defaultTime);
  const [breakTime, setBreakTime] = useState<number>(defaultBreakTime);

  const handleNumericChange = (
    value: number,
    callback: (value: number) => void,
    maxValue: number = 100,
  ) => {
    callback(Math.min(Math.max(value, 0), maxValue));
  };

  useEffect(() => {
    onFormUpdate({
      sets: exerciseType?.has_sets ? sets : null,
      reps: exerciseType?.has_reps ? reps : null,
      weight: exerciseType?.has_weights ? weight : null,
      time: exerciseType?.has_time ? time : null,
      breakTime: exerciseType?.has_sets && sets > 1 ? breakTime : null,
    });
  }, [breakTime, exerciseType, onFormUpdate, reps, sets, time, weight]);

  return (
    <View style={styles.container}>
      {exerciseType?.has_sets && (
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
          value={weight}
          onChageText={(value) => handleNumericChange(value, setWeight, 1000)}
          label="Weight"
          icon={Icons.weight}
        />
      )}
      {exerciseType?.has_time && (
        <RowTextInput
          value={time}
          onChageText={(value) => handleNumericChange(value, setTime)}
          label="Time"
          icon={Icons.time}
        />
      )}

      {exerciseType?.has_sets && sets > 1 && (
        <RowTextInput
          value={breakTime}
          onChageText={(value) => handleNumericChange(value, setBreakTime)}
          label="Break"
          icon={Icons.battery}
        />
      )}
    </View>
  );
};

export default ExerciseDetailsForm;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
