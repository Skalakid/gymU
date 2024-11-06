import { StyleSheet, View } from 'react-native';
import React from 'react';
import useTheme from '@/hooks/useTheme';

const ModalBar = () => {
  const theme = useTheme();
  return (
    <View style={styles.header}>
      <View style={[styles.bar, { backgroundColor: theme.text }]} />
    </View>
  );
};

export default ModalBar;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },
  bar: {
    width: 64,
    height: 5,
    borderRadius: 5,
  },
});
