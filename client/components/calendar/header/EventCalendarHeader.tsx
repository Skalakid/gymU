import { weekDays, weekDaysMap } from '@/constants/Text';
import ThemedView from '@/components/ThemedView';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import EventCalendarHeaderCell from './EventCalendarHeaderCell';

const EventCalendarHeader = () => {
  const cells = useMemo(
    () =>
      weekDays
        .map(({ key }) => weekDaysMap.get(key)?.abbreviation)
        .map((abbreviation, index) => (
          <EventCalendarHeaderCell content={abbreviation ?? ''} key={index} />
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

export default EventCalendarHeader;
