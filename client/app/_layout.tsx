import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  useFonts,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
} from '@expo-google-fonts/poppins';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AuthContextProvider, useAuthContext } from '@/contexts/AuthContext';
import { CreateWorkoutContextProvider } from '@/contexts/CreateWorkoutContext';
import { ExerciseContextProvider } from '@/contexts/ExerciseContext';
import { WorkoutContextProvider } from '@/contexts/WorkoutContext';
import { LiveTrainingContextProvider } from '@/contexts/LiveTrainingContext';
import { CardSwitcherContexttProvider } from '@/contexts/CardSwitcherContext';
import { CreateCalendarEventContextProvider } from '@/contexts/CreateCalendarEventContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isAuthenticated, isLoaded } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const isTabsGroup = segments[0] === '(tabs)';
    if (isAuthenticated && !isTabsGroup) {
      router.replace('/home');
    } else if (!isAuthenticated) {
      router.replace('/(auth)');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="live-training"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    Poppins_300: Poppins_300Light,
    Poppins_300_italic: Poppins_300Light_Italic,
    Poppins_400: Poppins_400Regular,
    Poppins_400_italic: Poppins_400Regular_Italic,
    Poppins_500: Poppins_500Medium,
    Poppins_500_italic: Poppins_500Medium_Italic,
    Poppins_600: Poppins_600SemiBold,
    Poppins_600_italic: Poppins_600SemiBold_Italic,
    Poppins_700: Poppins_700Bold,
    Poppins_700_italic: Poppins_700Bold_Italic,
    Poppins: Poppins_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthContextProvider>
      <CardSwitcherContexttProvider>
        <LiveTrainingContextProvider>
          <WorkoutContextProvider>
            <ExerciseContextProvider>
              <CreateWorkoutContextProvider>
                <CreateCalendarEventContextProvider>
                  <ThemeProvider
                    value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
                  >
                    <SafeAreaView
                      style={[
                        styles.container,
                        {
                          backgroundColor:
                            Colors[colorScheme ?? 'light'].background,
                        },
                      ]}
                    >
                      <InitialLayout />
                    </SafeAreaView>
                  </ThemeProvider>
                </CreateCalendarEventContextProvider>
              </CreateWorkoutContextProvider>
            </ExerciseContextProvider>
          </WorkoutContextProvider>
        </LiveTrainingContextProvider>
      </CardSwitcherContexttProvider>
    </AuthContextProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
