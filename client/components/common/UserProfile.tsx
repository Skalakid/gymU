import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from './Icon';
import Icons from '@/constants/Icons';

type UserProfileType = {
  onPress: () => void;
  size?: number;
};

const UserProfile = ({ onPress, size }: UserProfileType) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.avatar}>
      <Icon icon={Icons.user} size={size} />
    </TouchableOpacity>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    overflow: 'hidden',
  },
});
