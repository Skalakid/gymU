import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

const ExplorePage = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Explore page</ThemedText>
    </ThemedView>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
