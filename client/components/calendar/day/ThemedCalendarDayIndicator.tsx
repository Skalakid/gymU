import { View, StyleSheet } from 'react-native';
import { CalendarEvent } from '../ThemedCalendar';
import { useMemo } from 'react';
import ThemedCalendarDayDot from './ThemedCalendarDayDot';

type ThemedCalendarDayIndicatorProps = {
  events: CalendarEvent[];
};

const ThemedCalendarDayIndicator = ({
  events,
}: ThemedCalendarDayIndicatorProps) => {
  const dots = useMemo(
    () =>
      events.map((event, index) => (
        <ThemedCalendarDayDot event={event} key={index} />
      )),
    [events],
  );

  return (
    <View style={[styles.container, dots.length === 0 ? styles.empty : null]}>
      {dots}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    flexDirection: 'row',
    gap: 2.5,
  },
  empty: {
    height: 0,
  },
});

export default ThemedCalendarDayIndicator;
