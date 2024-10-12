import { StyleSheet } from 'react-native';
import useTheme from '@/hooks/useTheme';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';

type SelectDropdownItemProps = {
  value: string;
};

const SelectDropdownItem = ({ value }: SelectDropdownItemProps) => {
  const theme = useTheme();
  return (
    <ThemedView style={[styles.selectItem, { backgroundColor: theme.tile }]}>
      <ThemedText style={{ color: theme.text }}>{value}</ThemedText>
    </ThemedView>
  );
};

export default SelectDropdownItem;

const styles = StyleSheet.create({
  selectItem: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    padding: 2,
    margin: 2,
  },
});
