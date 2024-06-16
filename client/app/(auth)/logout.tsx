import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
/**
 * Logout page that logs out the user and redirects to the landing page.
 * Used in case of refresh token error to end the current session.
 * Can be used when AuthContext is not available.
 */
const LogoutPage = () => {
  const { logout } = useAuthContext();

  useEffect(() => {
    const logoutUser = async () => {
      await logout();
    };

    logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText size="l" weight="semiBold">
        Logging out...
      </ThemedText>
      <ActivityIndicator size="large" color={Colors.dark.primary} />
    </ThemedView>
  );
};

export default LogoutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
