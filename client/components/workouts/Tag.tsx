import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import { Colors } from '@/constants/Colors';

type TagProps = {
  value: string;
};

const Tag = ({ value }: TagProps) => {
  return (
    <View style={styles.container}>
      <ThemedText size="m" weight="medium" color="#D9D9D9">
        {value}
      </ThemedText>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
