import { View, StyleSheet } from 'react-native';

const ThemedCalendarDayDot = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: 5,
    height: 5,

    borderRadius: 5,
    backgroundColor: '#aaa',
  },
});

export default ThemedCalendarDayDot;
