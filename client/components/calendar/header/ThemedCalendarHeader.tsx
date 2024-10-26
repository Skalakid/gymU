import { weekDays, weekDaysMap } from '@/constants/Text';
import ThemedView from '@/components/ThemedView';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import ThemedCalendarHeaderCell from './ThemedCalendarHeaderCell';

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
