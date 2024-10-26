import { ViewStyle, StyleSheet } from 'react-native';

import ThemedView from '../ThemedView';
import { useMemo } from 'react';
import EventCalendarRow from './EventCalendarRow';
import EventCalendarHeader from './header/EventCalendarHeader';
import { prepareCalendar } from '@/utils/date.utils';

export type CalendarEvent = {
  color?: string;
  name?: string;
};

export type CalendarCell = {
  date: string;
  events: CalendarEvent[];
  currentMonth: boolean;
  selected?: boolean;
  current?: boolean;
};

export type CalendarEvents = {
  [date: string]: CalendarEvent[];
};

type EventCalendarDayProps = {
  onDayPress: (day: string) => void;
  style?: ViewStyle;
  month: number;
  year: number;
  events: CalendarEvents;
  selectedDate?: string;
  currentDate?: string;
};

const EventCalendar = ({
  month,
  year,
  events,
  style,
  selectedDate,
  currentDate,
  onDayPress,
}: EventCalendarDayProps) => {
  const currentCalendar = useMemo(
    () => prepareCalendar(month, year, events ?? {}, selectedDate, currentDate),
    [month, year, events, selectedDate, currentDate],
  );

  const calendar = currentCalendar.map((row, index) => (
    <EventCalendarRow children={row} key={index} onDayPress={onDayPress} />
  ));

  return (
    <ThemedView style={[style]}>
      <EventCalendarHeader />
      <ThemedView style={styles.calendar}>{calendar}</ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {},
  calendar: { gap: 5 },
});

export default EventCalendar;
