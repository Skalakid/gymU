import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from './Icon';
import Icons from '@/constants/Icons';

type NotificationsBellProps = {
  size?: number;
  color?: string;
  showNotificationDot?: boolean;
  onPress?: () => void;
};

const NotificationsBell = ({
  size = 26,
  color,
  showNotificationDot,
  onPress,
}: NotificationsBellProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon icon={Icons.bell} size={size} color={color} />
      {showNotificationDot && (
        <View style={[styles.dot, { width: size / 3.25 }]} />
      )}
    </TouchableOpacity>
  );
};

export default NotificationsBell;

const styles = StyleSheet.create({
  dot: {
    aspectRatio: 1,
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    top: 4,
    left: 2,
  },
});
