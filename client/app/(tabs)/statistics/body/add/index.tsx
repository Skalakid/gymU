import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import Icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import CustomMeasurementsPrompt from './CustomMeasurementPrompt';
import { Alert, StyleSheet } from 'react-native';
import MeasurementStep from './MeasurementStep';
import fetchApi from '@/api/fetch';

const AddMeasurement = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [measurements, setMeasurements] = useState<Record<string, number>[]>(
    [],
  );

  const handleAddMeasurement = async () => {
    try {
      let data = { user_id: -1 };

      for (const measurement of measurements) {
        data = { ...data, ...measurement };
      }

      const response = await fetchApi(
        '/measurement/create',
        'POST',
        null,
        data,
        true,
      );

      console.log(response);

      if (response.ok) {
        router.navigate('/statistics/body');
      } else {
        Alert.alert('Something went wrong...');
      }
    } catch {
      Alert.alert('Something went wrong...');
    }
  };

  const updateMeasurement = (
    measurement: Record<string, number>,
    shouldRepeatStep = false,
  ) => {
    const newMeasurements = [...measurements];
    newMeasurements.push(measurement);
    setMeasurements(newMeasurements);

    const nextStep = shouldRepeatStep ? -1 : 1;
    setCurrentStep((prev) => prev + nextStep);
  };

  return (
    <ThemedView style={styles.container}>
      <Header
        leftIcon={Icons.arrowLeft}
        leftIconSize={32}
        leftIconOnPress={() => router.back()}
        title={'Add measurements'}
      />

      {currentStep === 1 && (
        <MeasurementStep
          img={null}
          title={'weight'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {currentStep === 2 && (
        <MeasurementStep
          img={null}
          title={'biceps'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {currentStep === 3 && (
        <MeasurementStep
          img={null}
          title={'chest'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {currentStep === 4 && (
        <MeasurementStep
          img={null}
          title={'waist'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {currentStep === 5 && (
        <MeasurementStep
          img={null}
          title={'hips'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {currentStep === 6 && (
        <MeasurementStep
          img={null}
          title={'thigh'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {currentStep === 7 && (
        <MeasurementStep
          img={null}
          title={'calf'}
          updater={(result) => updateMeasurement(result)}
        />
      )}
      {currentStep === 8 && (
        <CustomMeasurementsPrompt
          stepUpdater={() => {
            setCurrentStep((prev) => prev + 1);
          }}
          addMeasurement={handleAddMeasurement}
        />
      )}
      {currentStep === 9 && (
        <MeasurementStep
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
  container: { flex: 1, alignItems: 'center' },
});
