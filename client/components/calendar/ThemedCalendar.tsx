import { ViewStyle, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useMemo } from 'react';
import ThemedCalendarRow from './ThemedCalendarRow';
import ThemedCalendarDay from './ThemedCalendarDay';

type CalendarEvent = {
  color?: string;
  name?: string;
};

export type CalendarCell = {
  date: string;
  events: CalendarEvent[];
  selected?: boolean;
  currentMonth: boolean;
};

type CalendarEvents = {
  [date: string]: CalendarEvent[];
};

type ThemedCalendarDayProps = {
  onDayPress: (day: string) => void;
  style?: ViewStyle;
  month: number;
  year: number;
  events: CalendarEvents;
};

/// TODO: Add local translations
const weekDays = {
  Mon: { id: 1 },
  Tue: { id: 2 },
  Wed: { id: 3 },
  Thu: { id: 4 },
  Fri: { id: 5 },
  Sat: { id: 6 },
  Sun: { id: 0 },
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
) => {
  const firstDay = new Date(year, month - 1, 1, 1);

  if (firstDay.getDate()) {
    firstDay.setDate(firstDay.getDate() - firstDay.getDay());
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
      firstDay.setDate(firstDay.getDate() + 1);
    }
  }

  return result;
};

console.log(
  prepareCalendar(6, 2024, {
    '2024-06-14': [{ name: 'wódeczka', color: 'red' }],
  }),
);

const ThemedCalendar = ({
  month,
  year,
  events,
  style,
  onDayPress,
}: ThemedCalendarDayProps) => {
  const currentCalendar = useMemo(
    () => prepareCalendar(month, year, events ?? {}),
    [month, year, events],
  );

  const calendar = currentCalendar.map((row, index) => (
    <ThemedCalendarRow children={row} key={index} />
  ));

  console.log(calendar);
  return (
    <ThemedView style={[style]}>
      <ThemedText>Siema</ThemedText>
      <ThemedView style={styles.calendar}>{calendar}</ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {},
  calendar: { gap: 5 },
});

export default ThemedCalendar;
