import ThemedView from '@/components/ThemedView';
import EventCalendar from '@/components/calendar/EventCalendar';
import EventCalendarNavigation from '@/components/calendar/navigation/EventCalendarNavigation';
import Icons from '@/constants/Icons';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import Header from '@/components/navigation/Header';
import {
  areMonthsEqual,
  getFormatedDate,
  getParsedValue,
} from '@/utils/date.utils';

const CalendarPage = () => {
  const [currentDate] = useState(getFormatedDate(new Date()));
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [month, setMonth] = useState(new Date(currentDate).getMonth() + 1);
  const [year, setYear] = useState(new Date(currentDate).getFullYear());

  const updateCalendarDate = useCallback(
    (currentMonth: number, currentYear: number) => {
      setMonth(currentMonth);
      setYear(currentYear);
      setSelectedDate(
        getFormatedDate(new Date(`${currentYear}-${currentMonth}-01`)),
      );
    },
    [setMonth, setYear],
  );

  const setNavigation = useCallback(
    (date: string) => {
      const currentYear = getParsedValue(date, 'year');
      const currentMonth = getParsedValue(date, 'month');

      setYear(currentYear);
      setMonth(currentMonth);
    },
    [setYear, setMonth],
  );

  const onNextPress = useCallback(() => {
    let currentMonth = month;
    let currentYear = year;

    if (month >= 12) {
      currentMonth = 1;
      currentYear++;
    } else {
      currentMonth++;
    }

    updateCalendarDate(currentMonth, currentYear);
  }, [updateCalendarDate, month, year]);

  const onPrevPress = useCallback(() => {
    let currentMonth = month;
    let currentYear = year;
    if (month <= 1) {
      currentMonth = 12;
      currentYear--;
    } else {
      currentMonth--;
    }

    updateCalendarDate(currentMonth, currentYear);
  }, [updateCalendarDate, month, year]);

  const onDayPress = useCallback(
    async (date: string) => {
      const previousDate = selectedDate;
      await setSelectedDate(date);

      if (!areMonthsEqual(date, previousDate)) {
        setNavigation(date);
      }
    },
    [setSelectedDate, selectedDate, setNavigation],
  );

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Calendar"
        rightIcon={Icons.calendarAdd}
        rightIconSize={26}
      />

      <EventCalendarNavigation
        month={month}
        year={year}
        onPrevPress={onPrevPress}
        onNextPress={onNextPress}
        style={styles.navigation}
      />
      <EventCalendar
        onDayPress={onDayPress}
        month={month}
        year={year}
        events={{
          '2024-06-21': [{ color: 'white', name: 'test1' }],
          '2024-06-22': [{ color: 'gray', name: 'test2' }],
          '2024-06-25': [{ color: 'red', name: 'test3' }],
          '2024-06-26': [
            { color: 'blue', name: 'test4' },
            { color: 'gray', name: 'test5' },
          ],
          '2024-06-28': [
            { color: 'blue', name: 'test6' },
            { color: 'gray', name: 'test7' },
            { color: 'gray', name: 'test8' },
          ],
        }}
        selectedDate={selectedDate}
        currentDate={currentDate}
      ></EventCalendar>
    </ThemedView>
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  navigation: {
    paddingHorizontal: 10,
  },
});
