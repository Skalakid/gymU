import { ThemedText, ThemedTextProps } from '@/components/ThemedText';
import { StyleSheet, TouchableOpacity } from 'react-native';

type LinkProps = ThemedTextProps & {
  onPress?: () => void;
};

const TextLink = ({ onPress, ...rest }: LinkProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedText
        {...rest}
        weight={rest.weight || 'medium'}
        style={[styles.link, rest.style]}
      />
    </TouchableOpacity>
  );
};

export default TextLink;

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
});
