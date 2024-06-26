import fetchApi from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import Header from '@/components/navigation/Header';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import { Colors } from '@/constants/Colors';
import Icons from '@/constants/Icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

type Workout = {
  workout_id: number;
  name: string;
  description: string;
  created_at: string;
  private: boolean;
  workout_tags: string[];
  author: {
    user_id: number;
    username: string;
  };
  workout_level: string;
};

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getAllWorkouts = async () => {
    try {
      const response = await fetchApi('/workout/all', 'GET', null);
      const paginatedWorkouts: PaginatedResponse<Workout> =
        await response.json();
      setWorkouts(paginatedWorkouts.data);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllWorkouts();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Header title="Workouts" rightIcon={Icons.circleAdd} rightIconSize={26} />
      <ThemedView style={[styles.content]}>
        <FlatList
          style={styles.workoutList}
          data={workouts}
          keyExtractor={(item) => item.workout_id.toString()}
          renderItem={({ item }) => (
            <WorkoutItem
              name={item.name}
              level={item.workout_level}
              tags={item.workout_tags}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListEmptyComponent={() =>
            isLoaded ? (
              <ThemedText>No workouts found...</ThemedText>
            ) : (
              <ActivityIndicator color={Colors.dark.primary} />
            )
          }
        />
      </ThemedView>
    </ThemedView>
  );
};

export default WorkoutsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  workoutList: {
    gap: 10,
  },
});
