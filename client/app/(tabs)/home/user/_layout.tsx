import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import useTheme from '@/hooks/useTheme';

const _layout = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
