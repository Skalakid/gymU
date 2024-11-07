import { StyleSheet } from 'react-native';
import React from 'react';
import IconButton from '@/components/button/IconButton';
import { SvgProps } from 'react-native-svg';
import useTheme from '@/hooks/useTheme';

type OpinionIconButtonProps = {
  icon: React.FC<SvgProps>;
  label: string;
  onPress?: () => void;
  selected?: boolean;
  color?: string;
};

const OpinionIconButton = ({
  icon,
  label,
  onPress,
  selected,
  color,
}: OpinionIconButtonProps) => {
  const theme = useTheme();
  return (
    <IconButton
      icon={icon}
      label={label}
      size={52}
      labelSize="m"
      labelStyle={styles.label}
      onPress={onPress}
      color={color}
      style={[
        styles.button,
        { borderColor: selected ? theme.text : 'transparent' },
      ]}
    />
  );
};

export default OpinionIconButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  label: { marginTop: 5 },
});
