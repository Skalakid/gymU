import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Image from '../Image';
import Icons from '@/constants/Icons';
import { ImageSource } from 'expo-image';

export type UserProfileType = {
  onPress: () => void;
  size?: number;
  avatarUrl?: string;
};

const UserProfile = ({ onPress, avatarUrl, size = 24 }: UserProfileType) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.avatar}>
      <Image
        source={avatarUrl}
        style={[{ width: size, height: size }]}
        placeholder={Icons.user as ImageSource}
      />
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
