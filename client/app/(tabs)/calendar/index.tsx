import ThemedView from '@/components/ThemedView';
import EventCalendar, {
  CalendarEvents,
} from '@/components/calendar/EventCalendar';
import EventCalendarNavigation from '@/components/calendar/navigation/EventCalendarNavigation';
import Icons from '@/constants/Icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet } from 'react-native';
import Header from '@/components/navigation/Header';
import {
  areMonthsEqual,
  getCalendarFirstAndLastDay,
  getFormatedDate,
  getParsedValue,
} from '@/utils/date.utils';
import { useCreateCalendarEventContext } from '@/contexts/CreateCalendarEventContext';
import fetchApi from '@/api/fetch';
import { EventCalendarData } from '@/types/calendar';

const CalendarPage = () => {
  const [currentDate] = useState(getFormatedDate(new Date()));
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [month, setMonth] = useState(new Date(currentDate).getMonth() + 1);
  const [year, setYear] = useState(new Date(currentDate).getFullYear());
  const [events, setEvents] = useState<EventCalendarData[]>([]);

  const router = useRouter();
  const { resetContext } = useCreateCalendarEventContext();

  useEffect(() => {
    resetContext();
  }, [resetContext]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { firstDay, lastDay } = getCalendarFirstAndLastDay(month, year);

      try {
        const response = await fetchApi(
          `/calendar/grid/${firstDay}/${lastDay}`,
          'GET',
          null,
          null,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        setEvents((await response.json()) ?? []);
      } catch (error) {
        console.error(error);
        Alert.alert(`Unable to load events for ${month}-${year}: ${error}`);
      }
    };

    fetchEvents();
  }, [month, year]);

  const updateCalendarDate = useCallback(
    (currentMonth: number, currentYear: number) => {
      setMonth(currentMonth);
      setYear(currentYear);
      setSelectedDate(
        getFormatedDate(new Date(`${currentYear}-${currentMonth}-01`)),
      );
    },
    [],
  );

  const setNavigation = useCallback((date: string) => {
    const currentYear = getParsedValue(date, 'year');
    const currentMonth = getParsedValue(date, 'month');

    setYear(currentYear);
    setMonth(currentMonth);
  }, []);

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
    if (month === 1) {
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
    [selectedDate, setNavigation],
  );

  const onAddToCalendarPress = () => {
    router.navigate('/calendar/add');
  };

  const calendarEvents = useMemo<CalendarEvents>(() => {
    const result: CalendarEvents = {};

    for (const event of events) {
      const date = getFormatedDate(new Date(event.datetime));

      if (!(date in result)) {
        result[date] = [];
      }

      result[date].push({
        color: 'gray',
        name: event.workout.name,
      });
    }

    return result;
  }, [events]);

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Calendar"
        rightIcon={Icons.calendarAdd}
        rightIconSize={26}
        rightIconOnPress={onAddToCalendarPress}
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
        events={calendarEvents}
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
