import SecondaryButton from '@/components/button/SecondaryButton';
import ThemedText from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';

const CustomMeasurementsPrompt = ({
  stepUpdater,
}: {
  stepUpdater: () => void;
}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ThemedText size="xl" weight="semiBold">
        Are there any custom measurements?
      </ThemedText>
      <SecondaryButton
        value={'yes'}
        onPress={() => {
          stepUpdater();
        }}
      />
      <SecondaryButton value={'no'} onPress={() => router.back()} />
    </View>
  );
};

export default CustomMeasurementsPrompt;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
});
