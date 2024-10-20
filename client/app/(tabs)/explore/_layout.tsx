import { Stack } from 'expo-router';

const WorkoutsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="add/exercise/details"
        options={{
          presentation: 'modal',
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
    </Stack>
  );
};

export default WorkoutsLayout;
