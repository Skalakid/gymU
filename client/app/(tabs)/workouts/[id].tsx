import fetchApi from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import Header from '@/components/navigation/Header';
import Icons from '@/constants/Icons';
import Images from '@/constants/Images';
import useTheme from '@/hooks/useTheme';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

const WorkoutDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();
  const isFocused = useIsFocused();
  const [workoutDetails, setWorkoutDetails] = useState({} as Workout);

  const getWorkoutDetails = useCallback(async () => {
    try {
      const response = await fetchApi(`/workout/${id}`, 'GET');
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const workoutDetails = await response.json();
      setWorkoutDetails(workoutDetails);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getWorkoutDetails();
  }, [getWorkoutDetails]);

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
          leftIconOnPress={() => router.back()}
        />

        <Animated.View
          style={[styles.modal, { backgroundColor: theme.background }]}
          entering={SlideInDown}
        >
          <ThemedText>{id}</ThemedText>
          <ThemedText>{workoutDetails.name}</ThemedText>
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
  header: { backgroundColor: 'transparent', marginBottom: 64 },
  modal: {
    flex: 1,
    paddingHorizontal: 20,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 250,
  },
});
