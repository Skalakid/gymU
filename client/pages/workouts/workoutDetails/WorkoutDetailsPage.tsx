import fetchApi from '@/api/fetch';
import ThemedView from '@/components/ThemedView';
import Header from '@/components/navigation/Header';
import PageSwitcher from '@/components/navigation/PageSwitcher';
import Icons from '@/constants/Icons';
import Images from '@/constants/Images';
import useTheme from '@/hooks/useTheme';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useLocalSearchParams,
  usePathname,
  useRouter,
  useSegments,
} from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import WorkoutGeneralInfo from './WorkoutGeneralInfo';
import WorkoutExercises from './WorkoutExercises';

type WorkoutDetailsPageProps = {
  workoutType?: 'external' | 'user';
};

const WorkoutDetailsPage = ({
  workoutType = 'external',
}: WorkoutDetailsPageProps) => {
  const theme = useTheme();
  const router = useRouter();
  const isFocused = useIsFocused();
  const segments = useSegments();
  const { id } = useLocalSearchParams();
  const [currentSubpage, setCurrentSubpage] = useState(0);
  const [workoutDetails, setWorkoutDetails] = useState<Workout | null>(null);
  const isExternal = workoutType === 'external';

  const getWorkoutDetails = useCallback(async () => {
    try {
      const response = await fetchApi(`/workout/${id}`, 'GET');
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const workoutDetails: Workout = await response.json();
      setWorkoutDetails(workoutDetails);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getWorkoutDetails();
  }, [getWorkoutDetails]);

  const renderSubpage = () => {
    if (!workoutDetails) return null;

    switch (currentSubpage) {
      case 0:
        return <WorkoutGeneralInfo workoutDetails={workoutDetails} />;
      case 1:
        return <WorkoutExercises workoutDetails={workoutDetails} />;
      default:
        return null;
    }
  };

  const handleGoBack = () => {
    if (
      segments[segments.length - 1] === 'exercises' &&
      segments[segments.length - 2] === '[id]'
    ) {
      router.back();
    }
    router.back();
  };

  const handleSaveWorkout = async () => {
    if (!workoutDetails || workoutDetails?.isSavedByUser || !isExternal) {
      return;
    }

    await fetchApi(`/user/workout/save`, 'POST', null, {
      workout_id: workoutDetails.workout_id,
    });
    await getWorkoutDetails();
  };

  if (!isFocused) return null;
  return (
    <ThemedView style={{ flex: 1 }}>
      <Animated.View entering={FadeIn.delay(200).duration(500)}>
        <Image
          source={Images.workout_example_img}
          contentFit="cover"
          style={{ width: '100%', height: 200 }}
        />
        <LinearGradient
          colors={[theme.background, 'transparent']}
          style={styles.gradient}
        />
      </Animated.View>
      <View style={styles.container}>
        <Header
          title={'Workout details'}
          style={styles.header}
          leftIcon={Icons.arrowLeft}
          leftIconSize={32}
          leftIconOnPress={handleGoBack}
          rightIcon={
            !isExternal
              ? undefined
              : workoutDetails?.isSavedByUser
                ? Icons.check
                : Icons.save
          }
          rightIconOnPress={handleSaveWorkout}
          rightIconSize={24}
        />

        <Animated.View
          style={[styles.modal, { backgroundColor: theme.background }]}
          entering={SlideInDown}
        >
          <View style={styles.switcher}>
            <PageSwitcher
              activePageIndex={currentSubpage}
              pages={['General info', 'Exercises']}
              onRouteChange={(index) => setCurrentSubpage(index)}
            />
          </View>

          {renderSubpage()}
        </Animated.View>
      </View>
    </ThemedView>
  );
};

export default WorkoutDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    marginBottom: 120,
    paddingLeft: 10,
  },
  modal: {
    flex: 1,
    padding: 20,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 150,
  },
  switcher: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
});
