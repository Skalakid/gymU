import ThemedView from '@/components/ThemedView';
import Header from '@/components/navigation/Header';
import PageSwitcher from '@/components/navigation/PageSwitcher';
import Icons from '@/constants/Icons';
import Images from '@/constants/Images';
import useTheme from '@/hooks/useTheme';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Slot, usePathname, useRouter, useSegments } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

const WorkoutDetailsPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const isFocused = useIsFocused();
  const segments = useSegments();
  const pathName = usePathname();
  const id = pathName.split('/')[2];

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
          leftIconOnPress={() => {
            if (
              segments[segments.length - 1] === 'exercises' &&
              segments[segments.length - 2] === '[id]'
            ) {
              router.back();
            }
            router.back();
          }}
        />

        <Animated.View
          style={[styles.modal, { backgroundColor: theme.background }]}
          entering={SlideInDown}
        >
          <View style={styles.switcher}>
            <PageSwitcher
              currentRoute={pathName}
              pages={[
                { name: 'General info', href: `/workouts/${id}` },
                { name: 'Exercises', href: `/workouts/${id}/exercises` },
              ]}
            />
          </View>
          <Slot />
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
  header: { backgroundColor: 'transparent', marginBottom: 120 },
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
