import SecondaryButton from '@/components/button/SecondaryButton';
import ThemedText from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type CustomMeasurementsPromptProps = {
  stepUpdater: () => void;
  addMeasurement: () => Promise<void>;
};

const CustomMeasurementsPrompt = ({
  stepUpdater,
  addMeasurement,
}: CustomMeasurementsPromptProps) => {
  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <ThemedText size="xl" weight="semiBold">
        Are there any custom measurements?
      </ThemedText>
      <SecondaryButton value={'yes'} onPress={stepUpdater} />
      <SecondaryButton value={'no'} onPress={addMeasurement} />
    </Animated.View>
  );
};

export default CustomMeasurementsPrompt;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
});
