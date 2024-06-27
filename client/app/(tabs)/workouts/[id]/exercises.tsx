import ThemedText from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';

import { StyleSheet } from 'react-native';

const WorkoutDetailsPage = () => {
  const { id } = useLocalSearchParams();

  return <ThemedText>Exercises</ThemedText>;
};

export default WorkoutDetailsPage;

const styles = StyleSheet.create({});
