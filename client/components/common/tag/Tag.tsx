import { StyleSheet, View, ViewStyle } from 'react-native';
import ThemedText from '../../ThemedText';
import useTheme from '@/hooks/useTheme';
import { SizePresets } from '@/constants/Typography';

type TagProps = {
  value: string;
  size?: keyof typeof SizePresets;
  style?: ViewStyle;
};

const Tag = ({ value, size, style }: TagProps) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.primary }, style]}>
      <ThemedText size={size || 's'} color="white">
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
