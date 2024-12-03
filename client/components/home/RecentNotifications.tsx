import { StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedText from '../ThemedText';

const RecentNotifications = () => {
  return (
    <View style={styles.feedContainer}>
      <ThemedText size="m" weight="regular">
        You haven't recorded any notifications yet
      </ThemedText>
    </View>
  );
};

export default RecentNotifications;

const styles = StyleSheet.create({
  feedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
