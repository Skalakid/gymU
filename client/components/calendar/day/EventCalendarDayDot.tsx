import { View, StyleSheet } from 'react-native';
import { CalendarEvent } from '../EventCalendar';

type EventCalendarDayDotProps = {
  event: CalendarEvent;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
