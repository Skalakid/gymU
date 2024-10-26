import PrimaryButton from '@/components/button/PrimaryButton';
import TextInput from '@/components/input/TextInput';
import Header from '@/components/navigation/Header';
import ThemedText from '@/components/ThemedText';
import Images from '@/constants/Images';
import useThemeColor from '@/hooks/useThemeColor';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

type MeasurementStepProps = {
  img: any;
  title: string | null;
  updater: (measurementResult: {}, shouldRepeatStep?: boolean) => void;
};

const MeasurementStep = ({ img, title, updater }: MeasurementStepProps) => {
  const [customMeasurementName, setCustomMeasurementName] = useState('');
  const [measurementValue, setMeasurementValue] = useState('');
  const backgroundColor = useThemeColor({}, 'tile');

  const validateForm = () => isNaN(parseFloat(measurementValue));

  const isCustomMeasurement = title === null;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header
        title={title ?? 'Custom'}
        style={{
          backgroundColor,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />

      {title && (
        <ThemedText size="xl" weight="semiBold">
          How to measure?
        </ThemedText>
      )}

      <Image
        source={img ?? Images.custom_measurement}
        contentFit="cover"
        style={{ width: '100%', height: 200 }}
      />

      {!title && (
        <>
          <ThemedText>What do you measure?</ThemedText>
          <TextInput onChangeText={setCustomMeasurementName} />
        </>
      )}
      <ThemedText>Your measurement</ThemedText>
      <TextInput
        onChangeText={setMeasurementValue}
        placeholder="Measured value..."
      />

      <PrimaryButton
        value={'Next'}
        onPress={() => {
          if (
            (isCustomMeasurement && customMeasurementName === '') ||
            measurementValue === ''
          ) {
            Alert.alert('Fill in required data');
            return;
          }

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

export default MeasurementStep;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '80%',

    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    gap: 10,
    padding: 10,

    position: 'absolute',
    bottom: 0,
  },
});
