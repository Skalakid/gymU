import PrimaryButton from '@/components/button/PrimaryButton';
import TextInput from '@/components/input/TextInput';
import ThemedText from '@/components/ThemedText';
import { useState } from 'react';
import { View } from 'react-native';

type StepProps = {
  img: any;
  title: string | null;
  updater: (measurementResult: {}, shouldRepeatStep?: boolean) => void;
};

export const Step = ({ img, title, updater }: StepProps) => {
  const [customMeasurementName, setCustomMeasurementName] = useState('');
  const [measurementValue, setMeasurementValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => isNaN(parseFloat(measurementValue));

  const isCustomMeasurement = title === null;

  return (
    <View
      style={{
        width: '100%',
        height: '80%',
        borderWidth: 2,
        borderColor: 'white',
      }}
    >
      <ThemedText size="xl" weight="semiBold">
        {`Enter ${title ?? 'custom'} measurement`}
      </ThemedText>
      <ThemedText size="xl" weight="semiBold" color="red">
        {errorMessage}
      </ThemedText>
      {!title && <TextInput onChangeText={setCustomMeasurementName} />}
      <TextInput onChangeText={setMeasurementValue} />

      <PrimaryButton
        value={'Submit'}
        onPress={() => {
          if (
            isCustomMeasurement &&
            (customMeasurementName === '' || measurementValue === '')
          ) {
            console.log('Fill in data');
            return;
          }

          console.log(validateForm());

          const measurement = {};
          // @ts-ignore works for now
          measurement[isCustomMeasurement ? customMeasurementName : title] =
            parseFloat(measurementValue);

          updater(measurement, isCustomMeasurement);
        }}
      />
    </View>
  );
};
