import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.text} size="h2">
          This page doesn't exist.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText size="link">Go to start screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
};
export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    paddingVertical: 15,
  },
  text: {
    textAlign: 'center',
  },
});
