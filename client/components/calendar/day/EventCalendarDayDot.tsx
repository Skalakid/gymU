import { View, StyleSheet } from 'react-native';
import { CalendarEvent } from '../EventCalendar';

type EventCalendarDayDotProps = {
  event: CalendarEvent;
};

const EventCalendarDayDot = (props: EventCalendarDayDotProps) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 5,
    height: 5,

    borderRadius: 5,
    backgroundColor: '#aaa',
  },
});

export default EventCalendarDayDot;
