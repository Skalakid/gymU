import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import Icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MeasurementStep from './MeasurementStep';
import { Mesaurement } from '@/types/measurement';
import MeasurementStatus from './MeasurementStatus';

const EMPTY_MEASUREMENT: Record<Mesaurement, number> = {
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
    useState<Record<Mesaurement, number>>(EMPTY_MEASUREMENT);

  const handleStartAgain = () => {
    setMeasurements(EMPTY_MEASUREMENT);
    setCurrentStep(1);
  };

  const updateMeasurement = (
    measurement: Mesaurement,
    measurementValue: number,
  ) => {
    const newMeasurements = { ...measurements };
    newMeasurements[measurement] = measurementValue;
    setMeasurements(newMeasurements);
    setCurrentStep((prev) => prev + 1);
  };

  const goBackAction = () => setCurrentStep((prev) => prev - 1);

  const formSteps = [
    { step: 1, img: null, title: 'weight' },
    { step: 2, img: null, title: 'biceps', goBackAction },
    { step: 3, img: null, title: 'chest', goBackAction },
    { step: 4, img: null, title: 'waist', goBackAction },
    { step: 5, img: null, title: 'hips', goBackAction },
    { step: 6, img: null, title: 'thigh', goBackAction },
    { step: 7, img: null, title: 'calf', goBackAction },
  ];

  return (
    <ThemedView style={styles.container}>
      <Header
        leftIcon={Icons.arrowLeft}
        leftIconSize={32}
        leftIconOnPress={() => router.back()}
        title={'Add measurements'}
      />

      {formSteps.map(
        (stepData, index) =>
          currentStep === stepData.step && (
            <MeasurementStep
              key={index}
              img={stepData.img}
              title={stepData.title as Mesaurement}
              updater={(mesaurment, mesaurmentValue) =>
                updateMeasurement(mesaurment, mesaurmentValue)
              }
              goBackAction={stepData.goBackAction}
            />
          ),
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
