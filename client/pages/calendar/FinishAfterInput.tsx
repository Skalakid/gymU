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
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
};

const FinishAfterInput = ({
  unit,
  value,
  onValueChange,
  style,
  minValue = 1,
  maxValue = calendarConstraints.repeats[unit].maxRepetitions,
  disabled,
}: FinishAfterInputProps) => {
  if (value < minValue) {
    onValueChange(minValue);
  }

  if (value > maxValue) {
    onValueChange(maxValue);
  }

  return (
    <View style={[styles.container, style]}>
      <ThemedText style={styles.text}>Finish after</ThemedText>
      <NumericValueInput
        style={styles.input}
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
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
