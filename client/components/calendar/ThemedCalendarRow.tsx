import { useMemo } from 'react';
import ThemedView from '../ThemedView';
import ThemedCalendarDay from './day/ThemedCalendarDay';
import { CalendarCell } from './ThemedCalendar';
import { StyleSheet } from 'react-native';

type ThemedCalendarRowProps = {
  children: CalendarCell[];
  onDayPress?: (day: string) => void;
};

const ThemedCalendarRow = ({
  children,
  onDayPress,
}: ThemedCalendarRowProps) => {
  const cells = useMemo(
    () =>
      children.map((cell, index) => (
        <ThemedCalendarDay
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

export default ThemedCalendarRow;
