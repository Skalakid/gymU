import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import Icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { CustomMeasurementsPrompt } from './CustomMeasurementPrompt';
import { StyleSheet } from 'react-native';
import { Step } from './Step';

const AddMeasurement = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [measurements, setMeasurements] = useState<{}>([]);

  const updateMeasurement = (measurement: {}, shouldRepeatStep = false) => {
    const newMeasurements = [...measurements];
    newMeasurements.push(measurement);
    setMeasurements(newMeasurements);

    const nextStep = shouldRepeatStep ? -1 : 1;
    setStep((prev) => prev + nextStep);
  };

  console.log(measurements);

  return (
    <ThemedView style={styles.container}>
      <Header
        leftIcon={Icons.arrowLeft}
        leftIconSize={32}
        leftIconOnPress={() => router.back()}
        title={'Add measurements'}
      />

      {step === 1 && (
        <Step
          img={null}
          title={'weight'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {step === 2 && (
        <Step
          img={null}
          title={'biceps'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {step === 3 && (
        <Step
          img={null}
          title={'chest'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {step === 4 && (
        <Step
          img={null}
          title={'waist'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {step === 5 && (
        <Step
          img={null}
          title={'hips'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {step === 6 && (
        <Step
          img={null}
          title={'thigh'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {step === 7 && (
        <Step
          img={null}
          title={'calf'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {step === 8 && (
        <CustomMeasurementsPrompt
          stepUpdater={() => {
            setStep((prev) => prev + 1);
          }}
        />
      )}
      {step === 9 && (
        <Step
          img={null}
          title={null}
          updater={(result, shouldRepeatStep) =>
            updateMeasurement(result, shouldRepeatStep)
          }
        />
      )}
    </ThemedView>
  );
};

export default AddMeasurement;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
