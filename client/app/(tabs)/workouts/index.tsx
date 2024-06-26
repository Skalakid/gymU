import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import Header from '@/components/navigation/Header';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import Icons from '@/constants/Icons';
import { FlatList, StyleSheet, View } from 'react-native';

const WorkoutsPage = () => {
  const workouts = [
    {
      workout_id: 1,
      name: 'Giga workout',
      description:
        'Professional workout dedicated for gym lovers that focuses on all muscle groups',
      created_at: '2024-06-26T19:25:59.053Z',
      private: false,
      workout_tags: ['Arms', 'Back'],
      author: {
        user_id: 1,
        username: 'devUser',
      },
      workout_level: 'beginner',
    },
    {
      workout_id: 2,
      name: '"the timetable is known" type of workout',
      description: 'Lets gooooo!',
      created_at: '2024-06-26T19:25:59.053Z',
      private: false,
      workout_tags: ['Chest', 'Cardio', 'Legs'],
      author: {
        user_id: 1,
        username: 'devUser',
      },
      workout_level: 'medium',
    },
  ];

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
