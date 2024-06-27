import { StyleSheet, View } from 'react-native';
import ThemedText, { ThemedTextProps } from '../ThemedText';

type LabeledTextProps = ThemedTextProps & {
  label: string;
  text: string;
};

const LabeledText = ({ label, text, ...rest }: LabeledTextProps) => {
  return (
    <View style={styles.container}>
      <ThemedText size="m" weight="medium">
        {label}
      </ThemedText>
      <ThemedText {...rest}>{text}</ThemedText>
    </View>
  );
};

export default LabeledText;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 5,
  },
});
