import NumericValueInput from '@/components/input/NumericValueInput';
import ThemedText from '@/components/ThemedText';
import { calendarConstraints } from '@/constants/Constraints';
import { TimeUnit } from '@/types/calendar';
import { StyleSheet, View, ViewStyle } from 'react-native';

type FinishAfterInputProps = {
  unit: TimeUnit;
  value: number;
  onValueChange: (value: number) => void;
  style?: ViewStyle;
};

const FinishAfterInput = ({
  unit,
  value,
  onValueChange,
  style,
}: FinishAfterInputProps) => {
  if (value < 0) {
    onValueChange(0);
  }

  if (value > calendarConstraints.repeats[unit].maxRepetitions) {
    onValueChange(calendarConstraints.repeats[unit].maxRepetitions);
  }

  return (
    <View style={[styles.container, style]}>
      <ThemedText style={styles.text}>Finish after</ThemedText>
      <NumericValueInput
        style={styles.input}
        minValue={0}
        maxValue={calendarConstraints.repeats[unit].maxRepetitions}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'right',
  },
  input: {
    flex: 1,
  },
});

export default FinishAfterInput;
