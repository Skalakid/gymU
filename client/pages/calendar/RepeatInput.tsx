import SelectDropdownInput from '@/components/input/dropdown/SelectDropdownInput';
import SelectDropdownItem from '@/components/input/dropdown/SelectDropdownItem';
import NumericValueInput from '@/components/input/NumericValueInput';
import ThemedText from '@/components/ThemedText';
import { calendarConstraints } from '@/constants/Constraints';
import { TimeUnit } from '@/types/calendar';
import { StyleSheet, View, ViewStyle } from 'react-native';

const timeUnits = [
  {
    unit: 'day',
  },
  {
    unit: 'week',
  },
  {
    unit: 'month',
  },
];

type RepeatInputProps = {
  value: number;
  unit: TimeUnit;
  onValueChange: (value: number) => void;
  onUnitChange: (unit: TimeUnit) => void;
  style?: ViewStyle;
};

const RepeatInput = ({
  value,
  unit,
  onValueChange,
  onUnitChange,
  style,
}: RepeatInputProps) => {
  if (value > calendarConstraints.repeats[unit].max) {
    onValueChange(calendarConstraints.repeats[unit].max);
  }

  if (value < calendarConstraints.repeats[unit].min) {
    onValueChange(calendarConstraints.repeats[unit].min);
  }

  return (
    <View style={style}>
      <ThemedText size="l" weight="semiBold">
        Repeat every:
      </ThemedText>
      <View style={styles.container}>
        <NumericValueInput
          style={styles.numericInput}
          value={value}
          onValueChange={onValueChange}
          minValue={0}
          maxValue={calendarConstraints.repeats[unit].max}
        />
        <SelectDropdownInput
          style={styles.unitInput}
          data={timeUnits}
          placeholder="day"
          renderItem={({ unit }) => (
            <>
              <SelectDropdownItem value={unit} />
            </>
          )}
          onSelect={(value) => {
            onUnitChange(value.unit);
          }}
          selectedValue={unit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    gap: 20,
  },
  numericInput: {
    flex: 1,
  },
  unitInput: {
    flex: 1,
    flexGrow: 1,
  },
});

export default RepeatInput;
