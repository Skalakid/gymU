import PrimaryButton from '@/components/button/PrimaryButton';
import Header from '@/components/navigation/Header';
import ThemedText from '@/components/ThemedText';
import Images from '@/constants/Images';
import useThemeColor from '@/hooks/useThemeColor';
import { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import SecondaryButton from '@/components/button/SecondaryButton';
import { MeasurementWithHeight, Mesaurement } from '@/types/measurement';
import NumericValueInput from '@/components/input/NumericValueInput';

type MeasurementStepProps = {
  img: string | null;
  title: Mesaurement | MeasurementWithHeight;
  updater: (measurement: Mesaurement, mesaurmentValue: number) => void;
  goBackAction?: () => void;
  description?: string;
};

const MeasurementStep = ({
  img,
  title,
  updater,
  goBackAction,
  description,
}: MeasurementStepProps) => {
  const [measurementValue, setMeasurementValue] = useState(0);
  const backgroundColor = useThemeColor({}, 'tile');
  const keyboardOffset = useSharedValue(0);

  const isFirstStep = goBackAction === undefined;

  Keyboard.addListener('keyboardDidShow', () => {
    keyboardOffset.value = Keyboard.metrics()?.height ?? 0;
  });

  Keyboard.addListener('keyboardDidHide', () => {
    keyboardOffset.value = 0;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginBottom: keyboardOffset.value / 1.4,
    };
  });

  return (
    <Animated.View
      style={[styles.container, { backgroundColor }, animatedStyle]}
      entering={isFirstStep ? SlideInDown : FadeIn}
      layout={LinearTransition}
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
        {description ?? 'How to measure?'}
      </ThemedText>

      <Image
        source={img ?? Images.customMeasurement}
        contentFit="cover"
        style={{ width: '100%', height: 200, borderRadius: 15 }}
      />

      <NumericValueInput
        label="Your measurement"
        onValueChange={setMeasurementValue}
        value={measurementValue}
      />

      <View style={styles.buttonsContainer}>
        <PrimaryButton
          value={'Next'}
          onPress={() => {
            updater(title, measurementValue);
          }}
        />

        <SecondaryButton
          value={'Go back'}
          onPress={goBackAction}
          disabled={isFirstStep}
          style={{ opacity: isFirstStep ? 0.7 : 1 }}
        />
      </View>
    </Animated.View>
  );
};

export default MeasurementStep;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '86%',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    gap: 20,
    padding: 10,

    position: 'absolute',
    bottom: 0,

    display: 'flex',
    justifyContent: 'space-around',
  },

  buttonsContainer: {
    width: '100%',
    gap: 20,
  },
});
