import { StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedText from '../ThemedText';
import NotificationsBell from '../common/NotificationsBell';
import UserProfile from '../userProfile/UserProfile';
import { useRouter } from 'expo-router';
import IconButton from '../button/IconButton';
import Icons from '@/constants/Icons';

type ProfileHeaderProps = {
  userId: number;
  username: string;
};

const ProfileHeader = ({ userId, username }: ProfileHeaderProps) => {
  const router = useRouter();

  const handleOnUsersPress = () => {
    router.navigate('/home/user/all');
  };

  const handleOnNotificationPress = () => {
    router.navigate(`/home/user/${userId}`);
  };

  return (
    <View style={styles.container}>
      <UserProfile onPress={handleOnNotificationPress} size={48} />
      <View style={styles.title}>
        <ThemedText weight="light">Welcome back! 👋</ThemedText>
        <ThemedText weight="medium" size="xxl">
          {username ?? 'Username'}
        </ThemedText>
      </View>
      <IconButton icon={Icons.users} onPress={handleOnUsersPress} size={26} />
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
