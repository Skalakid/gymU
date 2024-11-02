import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import Icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import MeasurementStep from './MeasurementStep';
import fetchApi from '@/api/fetch';
import { Mesaurements } from '@/types/measurement';
import { useSharedValue } from 'react-native-reanimated';
import MeasurementStatus from './MeasurementStatus';

const EMPTY_MEASUREMENT: Record<Mesaurements, number> = {
  weight: 0,
  biceps: 0,
  chest: 0,
  waist: 0,
  hips: 0,
  thigh: 0,
  calf: 0,
};

const AddMeasurement = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [measurements, setMeasurements] =
    useState<Record<Mesaurements, number>>(EMPTY_MEASUREMENT);

  const handleAddMeasurement = async () => {
    console.log(measurements);
    // try {
    //   let data = { user_id: -1 };

    //   for (const measurement of measurements) {
    //     data = { ...data, ...measurement };
    //   }

    //   const response = await fetchApi(
    //     '/measurement/create',
    //     'POST',
    //     null,
    //     data,
    //     true,
    //   );

    //   console.log(response);

    //   if (response.ok) {
    //     router.navigate('/statistics/body');
    //   } else {
    //     Alert.alert('Something went wrong...');
    //   }
    // } catch {
    //   Alert.alert('Something went wrong...');
    // }
  };

  const handleStartAgain = () => {
    setMeasurements(EMPTY_MEASUREMENT);
    setCurrentStep(1);
  };

  const updateMeasurement = (
    measurement: Mesaurements,
    measurementValue: number,
  ) => {
    const newMeasurements = { ...measurements };
    newMeasurements[measurement] = measurementValue;
    setMeasurements(newMeasurements);
    setCurrentStep((prev) => prev + 1);
  };

  const goBackAction = () => setCurrentStep((prev) => prev - 1);

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
          updater={(mesaurment, mesaurmentValue) =>
            updateMeasurement(mesaurment, mesaurmentValue)
          }
        />
      )}
      {currentStep === 2 && (
        <MeasurementStep
          img={null}
          title={'biceps'}
          updater={(mesaurment, mesaurmentValue) =>
            updateMeasurement(mesaurment, mesaurmentValue)
          }
          goBackAction={goBackAction}
        />
      )}
      {currentStep === 3 && (
        <MeasurementStep
          img={null}
          title={'chest'}
          updater={(mesaurment, mesaurmentValue) =>
            updateMeasurement(mesaurment, mesaurmentValue)
          }
          goBackAction={goBackAction}
        />
      )}
      {currentStep === 4 && (
        <MeasurementStep
          img={null}
          title={'waist'}
          updater={(mesaurment, mesaurmentValue) =>
            updateMeasurement(mesaurment, mesaurmentValue)
          }
          goBackAction={goBackAction}
        />
      )}
      {currentStep === 5 && (
        <MeasurementStep
          img={null}
          title={'hips'}
          updater={(mesaurment, mesaurmentValue) =>
            updateMeasurement(mesaurment, mesaurmentValue)
          }
          goBackAction={goBackAction}
        />
      )}
      {currentStep === 6 && (
        <MeasurementStep
          img={null}
          title={'thigh'}
          updater={(mesaurment, mesaurmentValue) =>
            updateMeasurement(mesaurment, mesaurmentValue)
          }
          goBackAction={goBackAction}
        />
      )}
      {currentStep === 7 && (
        <MeasurementStep
          img={null}
          title={'calf'}
          updater={(mesaurment, mesaurmentValue) =>
            updateMeasurement(mesaurment, mesaurmentValue)
          }
          goBackAction={goBackAction}
        />
      )}
      {currentStep === 8 && (
        <MeasurementStatus
          measurements={measurements}
          startAgainAction={handleStartAgain}
        />
      )}
    </ThemedView>
  );
};

export default AddMeasurement;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
});
