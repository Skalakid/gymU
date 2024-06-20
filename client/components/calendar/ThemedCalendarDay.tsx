import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { CalendarCell } from './ThemedCalendar';

type ThemedCalendarDayProps = {
  cell: CalendarCell;
  currentMonth: boolean;
  selected?: boolean;
  onDayPress?: (day: string) => void;
};

const ThemedCalendarDay = ({
  cell,
  onDayPress,
  selected,
  currentMonth,
}: ThemedCalendarDayProps) => {
  return (
    <ThemedView style={[styles.container, selected ? styles.selected : null]}>
      <ThemedText
        type="defaultSemiBold"
        style={[styles.text, currentMonth ? styles.currentMonth : null]}
      >
        {new Date(cell.date).getDate()}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: 100,
    height: 100,

    maxWidth: 45,
    maxHeight: 45,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  selected: {
    backgroundColor: 'white',
  },
  text: {
    color: '#aaa',
  },
  currentMonth: {
    color: 'white',
  },
});

export default ThemedCalendarDay;
