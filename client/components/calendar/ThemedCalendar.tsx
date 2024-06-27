import { ViewStyle, StyleSheet } from 'react-native';

import ThemedView from '../ThemedView';
import { useMemo } from 'react';
import ThemedCalendarRow from './ThemedCalendarRow';
import ThemedCalendarHeader from './header/ThemedCalendarHeader';

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

const zerofill = (value: number, padding: number = 2) => {
  return value.toString().padStart(padding, '0');
};

const getFormatedDate = (date: Date) =>
  `${date.getFullYear()}-${zerofill(date.getMonth() + 1)}-${zerofill(date.getDate())}`;

const prepareCalendar = (
  month: number,
  year: number,
  events: CalendarEvents,
  selected?: string,
  current?: string,
) => {
  const firstDay = new Date(year, month - 1, 1, 1);

  if (firstDay.getDay()) {
    firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);
  } else {
    firstDay.setDate(firstDay.getDate() - 6);
  }

  const result: CalendarCell[][] = [];

  for (let i = 0; i < 6; i++) {
    result.push(new Array(7));
  }

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      const currentDate = getFormatedDate(firstDay);

      result[i][j] = {
        date: currentDate,
        events: currentDate in events ? events[currentDate] : [],
        currentMonth: firstDay.getMonth() + 1 === month,
      };

      if (currentDate === selected) {
        result[i][j].selected = true;
      }

      if (currentDate === current) {
        result[i][j].current = true;
      }

      firstDay.setDate(firstDay.getDate() + 1);
    }
  }

  return result;
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
