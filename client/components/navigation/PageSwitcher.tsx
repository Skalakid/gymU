import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import TextLink from '../common/TextLink';

type PageSwitcherProps = {
  pages: string[];
  activePageIndex: number;
  onRouteChange: (index: number) => void;
};

const PageSwitcher = ({
  pages,
  activePageIndex,
  onRouteChange,
}: PageSwitcherProps) => {
  return (
    <View style={styles.switcher}>
      {pages.map((page, index) => (
        <View key={`${page}${index}`} style={styles.switcher}>
          <TextLink
            onPress={() => onRouteChange(index)}
            style={{
              textDecorationLine:
                activePageIndex === index ? 'underline' : 'none',
            }}
            size="xl"
          >
            {page}
          </TextLink>
          {index < pages.length - 1 && (
            <ThemedText style={styles.separator}>|</ThemedText>
          )}
        </View>
      ))}
    </View>
  );
};

export default PageSwitcher;

const styles = StyleSheet.create({
  switcher: {
    flexDirection: 'row',
  },
  link: {
    textDecorationLine: 'none',
  },
  separator: {
    marginHorizontal: 10,
  },
});
