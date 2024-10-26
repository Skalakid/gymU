import ThemedText from '@/components/ThemedText';
import { View, StyleSheet } from 'react-native';

type EventCalendarHeaderCellProps = {
  content: string;
};

const EventCalendarHeaderCell = ({ content }: EventCalendarHeaderCellProps) => {
  return (
    <View style={styles.container}>
      <ThemedText weight="bold" size="xl">
        {content}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,

    maxWidth: 45,
    maxHeight: 45,

    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
  },
  text: {
    color: '#aaa',
  },
});
export default EventCalendarHeaderCell;
