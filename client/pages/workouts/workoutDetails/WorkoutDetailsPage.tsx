import fetchApi from '@/api/fetch';
import PageSwitcher from '@/components/navigation/PageSwitcher';
import Icons from '@/constants/Icons';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WorkoutGeneralInfo from './WorkoutGeneralInfo';
import WorkoutExercises from './WorkoutExercises';
import WorkoutModalPage from '../WorkoutModalPage';

type WorkoutDetailsPageProps = {
  onWorkoutDetailsChange?: (workoutDetails: Workout) => void;
  onRightIconPress?: (workoutDetails: Workout) => void;
  rightIcon?: (typeof Icons)[keyof typeof Icons];
};

const WorkoutDetailsPage = ({
  onWorkoutDetailsChange,
  onRightIconPress,
  rightIcon,
}: WorkoutDetailsPageProps) => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { id } = useLocalSearchParams();
  const [currentSubpage, setCurrentSubpage] = useState(0);
  const [workoutDetails, setWorkoutDetails] = useState<Workout | null>(null);

  const getWorkoutDetails = useCallback(async () => {
    try {
      const response = await fetchApi(`/workout/${id}`, 'GET');
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const workoutDetails: Workout = await response.json();
      setWorkoutDetails(workoutDetails);
      onWorkoutDetailsChange?.(workoutDetails);
    } catch (error) {
      console.error(error);
    }
  }, [id, onWorkoutDetailsChange]);

  useEffect(() => {
    getWorkoutDetails();
  }, [getWorkoutDetails]);

  const handleRightIconPress = async () => {
    if (onRightIconPress && workoutDetails) {
      await onRightIconPress(workoutDetails);
    }
    await getWorkoutDetails();
  };

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
    router.back();
  };

  if (!isFocused) return null;
  return (
    <WorkoutModalPage
      title="Workout Details"
      onGoBack={handleGoBack}
      rightIcon={rightIcon}
      rightIconOnPress={handleRightIconPress}
    >
      <>
        <View style={styles.switcher}>
          <PageSwitcher
            activePageIndex={currentSubpage}
            pages={['General info', 'Exercises']}
            onRouteChange={(index) => setCurrentSubpage(index)}
          />
        </View>

        {renderSubpage()}
      </>
    </WorkoutModalPage>
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
