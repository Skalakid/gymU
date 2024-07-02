import { Colors } from '@/constants/Colors';
import PrimaryButton, { ButtonProps } from './PrimaryButton';
import { StyleSheet } from 'react-native';

const SecondaryButton = (props: ButtonProps) => {
  const flattenedStyle = StyleSheet.flatten(props.style || {});
  return (
    <PrimaryButton
      {...props}
      style={[styles.secondaryButton, flattenedStyle]}
    />
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: Colors.dark.secondary,
  },
});
