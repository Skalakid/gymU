import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import ThemedCalendar from '@/components/calendar/ThemedCalendar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState('2024-06-27');
  const [currentDate, setCurrentDate] = useState(selectedDate);
  return (
    <ThemedView style={styles.container}>
      <ThemedCalendar
        onDayPress={(date: string) => {
          console.log('selected date', date);
          setSelectedDate(date);
        }}
        month={6}
        year={2024}
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
      ></ThemedCalendar>
    </ThemedView>
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
