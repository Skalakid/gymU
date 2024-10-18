import fetchApi from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import BasicExerciseItem from '@/components/exercises/BasicExerciseItem';
import Header from '@/components/navigation/Header';
import TagSelector from '@/components/workouts/TagSelector';
import Icons from '@/constants/Icons';
import { capitalize } from '@/utils/text.utils';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

const ExerciseListPage = () => {
  const router = useRouter();
  const [tags, setTags] = useState<WorkoutType[]>([]);
  const [exercises, setExercises] = useState<BasicExercise[]>([]);
  const [areTagsLoaded, setAreTagsLoaded] = useState(false);

  const loadExerciseTags = async () => {
    try {
      const response = await fetchApi('/exercise/types', 'GET', null);
      if (!response.ok) {
        console.error('Failed to load exercise tags');
        return;
      }
      const data: ExerciseType[] = await response.json();
      setTags(
        data.map((tag, index) => ({
          tag_id: index + 1,
          name: capitalize(tag.name),
        })),
      );
      setAreTagsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getExercises = async () => {
    try {
      const response = await fetchApi('/exercise/all', 'GET', null);
      if (!response.ok) {
        console.error('Failed to load exercises');
        return;
      }
      const data: BasicExercise[] = await response.json();
      setExercises(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onGoBack = () => {
    router.back();
  };

  useEffect(() => {
    loadExerciseTags();
    getExercises();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Header
        title={'Choose Exercise'}
        style={[styles.header]}
        leftIcon={Icons.arrowLeft}
        leftIconSize={32}
        leftIconOnPress={onGoBack}
        rightIconSize={24}
      />
      <View style={styles.content}>
        {areTagsLoaded && (
          <TagSelector
            style={styles.tagSelector}
            tags={tags}
            onSelectionChange={() => {}}
          />
        )}

        <FlatList
          style={styles.exerciseList}
          data={exercises ?? []}
          renderItem={({ item }) => (
            <BasicExerciseItem
              name={item.name}
              type={item.exercise_type}
              style={{ marginBottom: 20 }}
              bodyParts={item.body_parts}
              description={item.shortDescription}
            />
          )}
        />
      </View>
    </ThemedView>
  );
};

export default ExerciseListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tagSelector: {
    marginBottom: 20,
  },
  exerciseList: {
    gap: 10,
  },
});
