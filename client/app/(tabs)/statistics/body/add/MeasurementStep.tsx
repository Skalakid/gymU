import PrimaryButton from '@/components/button/PrimaryButton';
import TextInput from '@/components/input/TextInput';
import Header from '@/components/navigation/Header';
import ThemedText from '@/components/ThemedText';
import Images from '@/constants/Images';
import useThemeColor from '@/hooks/useThemeColor';
import { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import SecondaryButton from '@/components/button/SecondaryButton';
import { Mesaurements } from '@/types/measurement';

type MeasurementStepProps = {
  img: string | null;
  title: Mesaurements;
  updater: (measurement: Mesaurements, mesaurmentValue: number) => void;
  goBackAction?: () => void;
};

const MeasurementStep = ({
  img,
  title,
  updater,
  goBackAction,
}: MeasurementStepProps) => {
  const [measurementValue, setMeasurementValue] = useState('');
  const backgroundColor = useThemeColor({}, 'tile');

  const validateForm = () => !isNaN(parseFloat(measurementValue));

  const isFirstStep = goBackAction === undefined;

  return (
    <Animated.View
      style={[styles.container, { backgroundColor }]}
      entering={isFirstStep ? SlideInDown : FadeIn}
      exiting={FadeOut}
    >
      <Header
        title={title}
        style={{
          backgroundColor,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />

      <ThemedText size="xl" weight="semiBold">
        How to measure?
      </ThemedText>

      <Image
        source={img ?? Images.custom_measurement}
        contentFit="cover"
        style={{ width: '100%', height: 200, borderRadius: 15 }}
      />

      <TextInput
        label="Your measurement"
        onChangeText={setMeasurementValue}
        placeholder="Measured value..."
      />

      <PrimaryButton
        value={'Next'}
        onPress={() => {
          if (!validateForm()) {
            Alert.alert('Please provide numeric value');
            return;
          }

          updater(title, parseFloat(measurementValue));
        }}
      />

      <SecondaryButton
        value={'Go back'}
        onPress={goBackAction}
        disabled={isFirstStep}
        style={{ opacity: isFirstStep ? 0.7 : 1 }}
      />
    </Animated.View>
  );
};

export default MeasurementStep;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '78%',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    gap: 10,
    padding: 10,

    position: 'absolute',
    bottom: 0,
  },
});
