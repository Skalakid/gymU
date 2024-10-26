import { View, StyleSheet } from 'react-native';
import { CalendarEvent } from '../EventCalendar';
import { useMemo } from 'react';
import EventCalendarDayDot from './EventCalendarDayDot';

type EventCalendarDayIndicatorProps = {
  events: CalendarEvent[];
};

const EventCalendarDayIndicator = ({
  events,
}: EventCalendarDayIndicatorProps) => {
  const dots = useMemo(
    () =>
      events.map((event, index) => (
        <EventCalendarDayDot event={event} key={index} />
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

export default EventCalendarDayIndicator;
