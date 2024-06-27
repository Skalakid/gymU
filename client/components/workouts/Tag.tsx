import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import useTheme from '@/hooks/useTheme';

type TagProps = {
  value: string;
};

const Tag = ({ value }: TagProps) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <ThemedText size="s" color="white">
        {value}
      </ThemedText>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
