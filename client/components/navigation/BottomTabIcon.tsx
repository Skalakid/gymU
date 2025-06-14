import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';
import { Colors } from '@/constants/Colors';

type BottomTabIcon = {
  name: string;
  icon: (typeof Icons)[keyof typeof Icons];
  focused?: boolean;
  color?: string;
};

const BottomTabIcon = ({
  name,
  icon,
  color = Colors.light.icon,
}: BottomTabIcon) => {
  return (
    <View style={styles.container}>
      <Icon icon={icon} size={24} color={color} />
      <Text style={[{ color: color }, styles.text]}>{name}</Text>
    </View>
  );
};

export default BottomTabIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  text: {
    fontSize: 10,
  },
});
