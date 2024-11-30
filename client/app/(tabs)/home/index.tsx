import ThemedView from '@/components/ThemedView';
import ProfileHeader from '@/components/home/ProfileHeader';
import { useAuthContext } from '@/contexts/AuthContext';
import { StyleSheet } from 'react-native';

const HomePage = () => {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ProfileHeader username={user.username} />
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
