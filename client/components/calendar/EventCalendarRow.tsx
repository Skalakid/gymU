import { useMemo } from 'react';
import ThemedView from '../ThemedView';
import EventCalendarDay from './day/EventCalendarDay';
import { CalendarCell } from './EventCalendar';
import { StyleSheet } from 'react-native';

type EventCalendarRowProps = {
  children: CalendarCell[];
  onDayPress?: (day: string) => void;
};

const EventCalendarRow = ({ children, onDayPress }: EventCalendarRowProps) => {
  const cells = useMemo(
    () =>
      children.map((cell, index) => (
        <EventCalendarDay
          cell={cell}
          currentMonth={cell.currentMonth}
          key={index}
          onPress={onDayPress}
        />
      )),
    [children, onDayPress],
  );

  return <ThemedView style={styles.container}>{cells}</ThemedView>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',

    height: 45,

    gap: 5,
    justifyContent: 'center',
  },
});

export default EventCalendarRow;
