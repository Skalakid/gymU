import { StyleSheet } from 'react-native';
import React from 'react';
import IconButton from '../button/IconButton';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';

type OpenButtonProps = {
  onPress: () => void;
};

const OpenButton = ({ onPress }: OpenButtonProps) => {
  const theme = useTheme();
  return (
    <IconButton
      icon={Icons.open}
      onPress={onPress}
      style={[styles.button, { backgroundColor: theme.secondary }]}
    />
  );
};

export default OpenButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: 40,
    height: 40,
  },
});
