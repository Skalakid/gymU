import PrimaryButton, { ButtonProps } from './PrimaryButton';
import { StyleSheet } from 'react-native';
import useTheme from '@/hooks/useTheme';

const SecondaryButton = (props: ButtonProps) => {
  const theme = useTheme();
  const flattenedStyle = StyleSheet.flatten(props.style || {});
  return (
    <PrimaryButton
      {...props}
      style={[
        { backgroundColor: props.disabled ? 'grey' : theme.secondary },
        flattenedStyle,
      ]}
    />
  );
};

export default SecondaryButton;
