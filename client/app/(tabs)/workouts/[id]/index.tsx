import ThemedText from '@/components/ThemedText';
import PrimaryButton from '@/components/button/PrimaryButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const WorkoutDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <ThemedText>General info</ThemedText>
      <PrimaryButton
        value="test"
        onPress={() => {
          router.navigate(`/workouts/${id}/exercises`);
        }}
      />
    </View>
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
