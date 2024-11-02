import SelectDropdownInput from '@/components/input/dropdown/SelectDropdownInput';
import SelectDropdownItem from '@/components/input/dropdown/SelectDropdownItem';
import NumericValueInput from '@/components/input/NumericValueInput';
import { TimeUnit } from '@/types/calendar';
import { StyleSheet, View } from 'react-native';

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
};

const RepeatInput = ({
  value,
  unit,
  onValueChange,
  onUnitChange,
}: RepeatInputProps) => {
  return (
    <View style={styles.container}>
      <NumericValueInput
        style={styles.numericInput}
        value={value}
        onValueChange={onValueChange}
        minValue={0}
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
