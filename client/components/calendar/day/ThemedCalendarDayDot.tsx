import { View, StyleSheet } from 'react-native';
import { CalendarEvent } from '../ThemedCalendar';

type ThemedCalendarDayDotProps = {
  event: CalendarEvent;
};

const ThemedCalendarDayDot = ({ event }: ThemedCalendarDayDotProps) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: 5,
    height: 5,

    borderRadius: 5,
    backgroundColor: '#aaa',
  },
});

export default ThemedCalendarDayDot;
