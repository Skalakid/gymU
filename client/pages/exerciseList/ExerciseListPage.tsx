import fetchApi, { fetchApiWithQueryParams } from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import SectionListHeader from '@/components/common/SectionListHeader';
import BasicExerciseItem from '@/components/exercises/BasicExerciseItem';
import Header from '@/components/navigation/Header';
import TagSelector from '@/components/workouts/TagSelector';
import Icons from '@/constants/Icons';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import { capitalize } from '@/utils/text.utils';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

type ExerciseResponse = {
  exercises: BasicExercise[];
  recommended: BasicExercise[];
};

type ExerciseListPageProps = {
  onItemSelected: (exercise: BasicExercise) => void;
};

const getUniqueExerciseIds = (exercises: OrderedExerciseItem[]) => {
  const mapped = exercises.map((item) => item.exerciseId);
  const unique = Array.from(new Set(mapped));
  return unique;
};

const ExerciseListPage = ({ onItemSelected }: ExerciseListPageProps) => {
  const router = useRouter();
  const [tags, setTags] = useState<WorkoutType[]>([]);
  const [exercises, setExercises] = useState<BasicExercise[]>([]);
  const [recommendedExercises, setRecommendedExercises] = useState<
    BasicExercise[]
  >([]);
  const [areTagsLoaded, setAreTagsLoaded] = useState(false);
  const { selectedExercises } = useCreateWorkoutContext();

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
          tagId: index + 1,
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
      const response = await fetchApiWithQueryParams('/exercise/all', {
        selectedExercises: getUniqueExerciseIds(selectedExercises),
      });
      if (!response.ok) {
        console.error('Failed to load exercises');
        return;
      }
      const data: ExerciseResponse = await response.json();
      setExercises(data.exercises);
      setRecommendedExercises(data.recommended);
    } catch (error) {
      console.error(error);
    }
  };

  const onGoBack = () => {
    router.back();
  };

  const handleItemPress = (exercise: BasicExercise) => {
    onItemSelected(exercise);
  };

  useEffect(() => {
    loadExerciseTags();
    getExercises();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sections = useMemo(
    () => [
      ...(recommendedExercises.length > 0
        ? [{ title: 'Recommendations', data: recommendedExercises }]
        : []),
      { title: 'Exercises', data: exercises },
    ],
    [exercises, recommendedExercises],
  );

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
        <ThemedText weight="semiBold" size="m">
          Choose an exercise to your workout
        </ThemedText>
        {areTagsLoaded && (
          <TagSelector
            style={styles.tagSelector}
            tags={tags}
            onSelectionChange={() => {
              // TODO: Add pagination for exercises
            }}
          />
        )}

        <SectionList
          style={styles.exerciseList}
          sections={sections ?? []}
          renderItem={({ item, index }) => (
            <BasicExerciseItem
              key={`exercise${item.name}${index}`}
              name={item.name}
              type={item.exerciseType}
              style={{ marginBottom: 20 }}
              bodyParts={item.bodyParts}
              description={item.shortDescription}
              onPress={() => handleItemPress(item)}
            />
          )}
          stickySectionHeadersEnabled={true}
          renderSectionHeader={({ section: { title } }) => (
            <SectionListHeader title={title} />
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
    gap: 10,
  },
  exerciseList: {
    gap: 10,
  },
  tagSelector: {
    marginBottom: 5,
  },
});
