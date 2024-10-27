import { StyleSheet, TouchableOpacity } from 'react-native';
import ThemedText from '../../ThemedText';

import { CalendarCell } from '../EventCalendar';
import { useMemo } from 'react';
import EventCalendarDayIndicator from './EventCalendarDayIndicator';

type EventCalendarDayProps = {
  cell: CalendarCell;
  currentMonth: boolean;
  onPress?: (day: string) => void;
};

const EventCalendarDay = ({
  cell,
  onPress,
  currentMonth,
}: EventCalendarDayProps) => {
  const date = useMemo(() => new Date(cell.date).getDate(), [cell]);

  return (
    <TouchableOpacity
      onPress={() => onPress?.(cell.date)}
      style={[
        styles.container,
        cell.current ? styles.currentDate : null,
        cell.selected ? styles.selectedDate : null,
      ]}
    >
      <ThemedText
        weight="bold"
        textType="description"
        style={[
          styles.text,
          currentMonth ? styles.currentMonth : null,
          cell.selected ? styles.selectedDateText : null,
        ]}
      >
        {date}
      </ThemedText>
      <EventCalendarDayIndicator events={cell.events} />
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
  selectedDate: {
    backgroundColor: '#fff',
  },
  selectedDateText: {
    color: '#494949',
  },
  currentDate: {
    borderColor: '#777779',
    borderWidth: 2,
  },
  text: {
    color: '#aaa',
  },
  currentMonth: {
    color: 'white',
  },
});

export default EventCalendarDay;
