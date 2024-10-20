import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Icons from '@/constants/Icons';
import RowTextInput from '../input/RowTextInput';

type ExerciseDetailsFormProps = {
  type: string;
};

const ExerciseDetailsForm = ({ type }: ExerciseDetailsFormProps) => {
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);

  const onValue1Change = (text: string) => {
    const numbericValue = Number(text);
    if (isNaN(numbericValue)) {
      return;
    }
    setValue1(numbericValue);
  };

  const onValue2Change = (text: string) => {
    const numbericValue = Number(text);
    if (isNaN(numbericValue)) {
      return;
    }
    setValue2(numbericValue);
  };

  const renderFormBasedOnType = () => {
    return (
      <>
        <RowTextInput
          value={value1}
          onChageText={onValue1Change}
          label="Series"
          icon={Icons.repeat}
        />
        <RowTextInput
          value={value2}
          onChageText={onValue2Change}
          label="Reps"
          icon={Icons.flame}
        />
      </>
    );
  };

  return <View style={styles.constainer}>{renderFormBasedOnType()}</View>;
};

export default ExerciseDetailsForm;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    gap: 10,
  },
});
