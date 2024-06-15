import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ActivityIndicator, StyleSheet } from 'react-native';

const StartPage = () => {
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.dark.primary} />
    </ThemedView>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
