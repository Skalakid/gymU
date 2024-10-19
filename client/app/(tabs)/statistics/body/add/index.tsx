import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import Icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, View, Text } from 'react-native';

type StepProps = {
  img: any;
  title: string;
  updater: (measurementResult: string) => void;
};

const Step = ({ img, title, updater }: StepProps) => {
  return (
    <View style={{ width: '100%', height: '80%' }}>
      <Text>{title}</Text>
      <Button
        title={'submit'}
        onPress={() => {
          updater('test');
        }}
      />
    </View>
  );
};

const AddMeasurement = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [biceps, setBiceps] = useState();
  const [waist, setWaist] = useState();

  const updateMeasurement = (
    stateUpdater: (newState: any) => void,
    measruement: string,
  ) => {
    stateUpdater(measruement);
    setStep((prev) => prev + 1);
  };

  console.log(biceps, waist);

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
          title={'biceps'}
          updater={(result: string) => updateMeasurement(setBiceps, result)}
        />
      )}
      {step === 2 && (
        <Step
          img={null}
          title={'waist'}
          updater={(result: string) => updateMeasurement(setWaist, result)}
        />
      )}
    </ThemedView>
  );
};

export default AddMeasurement;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
