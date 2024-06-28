import { ViewStyle, StyleSheet } from 'react-native';

import ThemedView from '../ThemedView';
import { useMemo } from 'react';
import ThemedCalendarRow from './ThemedCalendarRow';
import ThemedCalendarHeader from './header/ThemedCalendarHeader';
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

type ThemedCalendarDayProps = {
  onDayPress: (day: string) => void;
  style?: ViewStyle;
  month: number;
  year: number;
  events: CalendarEvents;
  selectedDate?: string;
  currentDate?: string;
};

const ThemedCalendar = ({
  month,
  year,
  events,
  style,
  selectedDate,
  currentDate,
  onDayPress,
}: ThemedCalendarDayProps) => {
  const currentCalendar = useMemo(
    () => prepareCalendar(month, year, events ?? {}, selectedDate, currentDate),
    [month, year, events, selectedDate, currentDate],
  );

  const calendar = currentCalendar.map((row, index) => (
    <ThemedCalendarRow children={row} key={index} onDayPress={onDayPress} />
  ));

  return (
    <ThemedView style={[style]}>
      <ThemedCalendarHeader />
      <ThemedView style={styles.calendar}>{calendar}</ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {},
  calendar: { gap: 5 },
});

export default ThemedCalendar;
