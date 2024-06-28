import { Stack } from 'expo-router';

const WorkoutsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" options={{ freezeOnBlur: true }} />
    </Stack>
  );
};

export default WorkoutsLayout;
