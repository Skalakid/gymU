import { StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedText from '../ThemedText';
import NotificationsBell from '../common/NotificationsBell';
import UserProfile from '../common/UserProfile';
import { useRouter } from 'expo-router';

type ProfileHeaderProps = {
  userId: number;
  username: string;
  onPress?: () => void;
};

const ProfileHeader = ({ userId, username, onPress }: ProfileHeaderProps) => {
  const router = useRouter();
  const handlePress = () => {
    onPress?.();
    router.navigate(`/home/user/${userId}`);
  };

  return (
    <View style={styles.container}>
      <UserProfile onPress={handlePress} size={48} />
      <View style={styles.title}>
        <ThemedText weight="light">Welcome back! 👋</ThemedText>
        <ThemedText weight="medium" size="xxl">
          {username ?? 'Username'}
        </ThemedText>
      </View>
      <NotificationsBell />
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 10,
  },
  title: {
    flexDirection: 'column',
    flex: 1,
  },
});
