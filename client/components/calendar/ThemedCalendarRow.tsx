import { useMemo } from 'react';
import { ThemedView } from '../ThemedView';
import ThemedCalendarDay from './ThemedCalendarDay';
import { CalendarCell } from './ThemedCalendar';
import { Dimensions, StyleSheet } from 'react-native';

type ThemedCalendarRowProps = {
  children: CalendarCell[];
};

const isCurrentMont = (month: number, date: string) => {
  const currentDate = new Date(date);
  return currentDate.getMonth() + 1 == month;
};

const ThemedCalendarRow = ({ children }: ThemedCalendarRowProps) => {
  const cells = useMemo(
    () =>
      children.map((cell, index) => (
        <ThemedCalendarDay
          cell={cell}
          currentMonth={cell.currentMonth}
          key={index}
        />
      )),
    [children],
  );

  return <ThemedView style={styles.container}>{cells}</ThemedView>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',

    height: 45,
    borderColor: 'blue',
    gap: 5,
    justifyContent: 'center',
  },
});

export default ThemedCalendarRow;
