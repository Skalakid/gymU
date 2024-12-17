import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import useTheme from '@/hooks/useTheme';

type SectionListHeaderType = {
  title: string;
};

const SectionListHeader = ({ title }: SectionListHeaderType) => {
  const theme = useTheme();
  return (
    <View style={[style.container, { backgroundColor: theme.background }]}>
      <ThemedText size="h4" weight="semiBold">
        {title}
      </ThemedText>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default SectionListHeader;
