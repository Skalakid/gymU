import { StyleSheet } from 'react-native';
import React from 'react';
import Tile from '../common/Tile';
import UserProfile from './UserProfile';
import ThemedText from '../ThemedText';
import { useRouter } from 'expo-router';

type UserItemProps = {
  user: BaseUser;
  avatarUrl: string;
};

const UserItem = ({ user, avatarUrl }: UserItemProps) => {
  const router = useRouter();

  const hanldeOnUserProfilePress = () => {
    router.navigate(`/home/user/${user.userId}`);
  };

  return (
    <Tile style={styles.container}>
      <UserProfile
        size={36}
        avatarUrl={avatarUrl}
        onPress={hanldeOnUserProfilePress}
      />
      <ThemedText style={styles.text}>{user.username}</ThemedText>
    </Tile>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    padding: 15,
  },
  text: {
    flex: 1,
  },
});
