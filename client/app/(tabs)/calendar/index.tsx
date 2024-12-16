import ThemedView from '@/components/ThemedView';
import EventCalendar, {
  CalendarEvents,
} from '@/components/calendar/EventCalendar';
import EventCalendarNavigation from '@/components/calendar/navigation/EventCalendarNavigation';
import Icons from '@/constants/Icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Header from '@/components/navigation/Header';
import {
  areDatesEqual,
  areMonthsEqual,
  compareEventCalendarDatetime,
  dateToTime,
  getCalendarFirstAndLastDay,
  getFormatedDate,
  getParsedValue,
} from '@/utils/date.utils';
import { useCreateCalendarEventContext } from '@/contexts/CreateCalendarEventContext';
import fetchApi from '@/api/fetch';
import { EventCalendarData } from '@/types/calendar';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import ThemedText from '@/components/ThemedText';

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
          `/calendar/grid/${firstDay.getTime()}/${lastDay.getTime()}`,
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

  const currentDateEvents = useMemo(
    () =>
      events.filter((event) =>
        areDatesEqual(new Date(event.datetime), new Date(selectedDate)),
      ),
    [events, selectedDate],
  );

  const workoutItems = useMemo(
    () =>
      currentDateEvents
        .sort(compareEventCalendarDatetime)
        .map(({ eventId, datetime, workout }) => {
          return (
            <WorkoutItem
              id={workout.workoutId}
              name={`[${dateToTime(new Date(datetime))}] ${workout.name}`}
              level={workout.level}
              tags={workout.tags}
              onPress={() => {
                router.navigate({
                  // @ts-expect-error: pathname is correct
                  pathname: `/workouts/${workout.workoutId}`,
                  params: { eventId: eventId },
                });
              }}
              key={eventId}
            />
          );
        }),
    [currentDateEvents, router],
  );

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
      <ScrollView>
        <EventCalendar
          onDayPress={onDayPress}
          month={month}
          year={year}
          events={calendarEvents}
          selectedDate={selectedDate}
          currentDate={currentDate}
        />
        <View style={styles.workoutsContainer}>
          {workoutItems.length !== 0 ? (
            workoutItems
          ) : (
            <ThemedText style={styles.workoutsNotFound}>
              --- No trainings found ---
            </ThemedText>
          )}
        </View>
      </ScrollView>
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

  workoutsContainer: { padding: 20, gap: 20 },
  workoutsNotFound: {
    textAlign: 'center',
  },
});
