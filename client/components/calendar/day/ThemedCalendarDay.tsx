import { StyleSheet, TouchableOpacity } from 'react-native';
import ThemedText from '../../ThemedText';

import { CalendarCell } from '../ThemedCalendar';
import { useMemo } from 'react';
import ThemedCalendarDayIndicator from './ThemedCalendarDayIndicator';

type ThemedCalendarDayProps = {
  cell: CalendarCell;
  currentMonth: boolean;
  onPress?: (day: string) => void;
};

const ThemedCalendarDay = ({
  cell,
  onPress,
  currentMonth,
}: ThemedCalendarDayProps) => {
  const date = useMemo(() => new Date(cell.date).getDate(), [cell]);

  return (
    <TouchableOpacity
      onPress={(event) => {
        if (onPress) onPress(cell.date);
      }}
      style={[
        styles.container,
        cell.current ? styles.current : null,
        cell.selected ? styles.selected : null,
      ]}
    >
      <ThemedText
        textType="description"
        style={[styles.text, currentMonth ? styles.currentMonth : null]}
      >
        {date}
      </ThemedText>
      <ThemedCalendarDayIndicator events={cell.events} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,

    maxWidth: 45,
    maxHeight: 45,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 5,
    gap: 1,
  },
  selected: {
    backgroundColor: '#aaa4',
  },
  current: {
    borderColor: 'white',
    borderWidth: 1,
  },
  text: {
    color: '#aaa',
  },
  currentMonth: {
    color: 'white',
  },
});

export default ThemedCalendarDay;
