import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PrimaryButton from '@/components/button/PrimaryButton';
import { useAuthContext } from '@/contexts/AuthContext';
import { StyleSheet } from 'react-native';

const HomePage = () => {
  const { logout, user } = useAuthContext();
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Home page</ThemedText>
      <ThemedText weight="semiBold">Currently logged user: </ThemedText>
      <ThemedText textType="description">User ID: {user?.username}</ThemedText>
      <ThemedText textType="description">Email: {user?.email}</ThemedText>
      <ThemedText textType="description">USername: {user?.username}</ThemedText>

      <PrimaryButton value="Logout" onPress={logout} />
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
