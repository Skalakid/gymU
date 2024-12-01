import { StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedText from '../ThemedText';
import NotificationsBell from '../common/NotificationsBell';
import UserProfile from '../common/UserProfile';

type ProfileHeaderProps = {
  username: string;
};

const ProfileHeader = ({ username }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <UserProfile onPress={() => {}} size={48} />
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
