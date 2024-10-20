import ThemedView from '@/components/ThemedView';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import ThemedCalendarHeaderCell from './ThemedCalendarHeaderCell';

/// TODO: Add local translations
const weekDaysMap = new Map(
  Object.entries({
    monday: { id: 1, aberration: 'Mon' },
    tuesday: { id: 2, aberration: 'Tue' },
    wednesday: { id: 3, aberration: 'Wed' },
    thursday: { id: 4, aberration: 'Thu' },
    friday: { id: 5, aberration: 'Fri' },
    saturday: { id: 6, aberration: 'Sat' },
    sun: { id: 0, aberration: 'Sun' },
  }),
);

const weekDays = [
  { key: 'monday' },
  { key: 'tuesday' },
  { key: 'wednesday' },
  { key: 'thursday' },
  { key: 'friday' },
  { key: 'saturday' },
  { key: 'sun' },
];

const ThemedCalendarHeader = () => {
  const cells = useMemo(
    () =>
      weekDays
        .map(({ key }) => weekDaysMap.get(key)?.aberration)
        .map((aberration, index) => (
          <ThemedCalendarHeaderCell content={aberration ?? ''} key={index} />
        )),
    [],
  );
  return <ThemedView style={styles.container}>{cells}</ThemedView>;
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',

    height: 45,

    gap: 5,
    justifyContent: 'center',
  },
});

export default ThemedCalendarHeader;
