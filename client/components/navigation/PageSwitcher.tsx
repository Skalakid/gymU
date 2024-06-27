import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import TextLink from '../common/TextLink';

type PageSwitcherProps = {
  pages: string[];
  currentRoute: string;
  onRouteChange: (index: number) => void;
};

const PageSwitcher = ({
  pages,
  currentRoute,
  onRouteChange,
}: PageSwitcherProps) => {
  return (
    <View style={styles.switcher}>
      {pages.map((page, index) => (
        <>
          <TextLink
            onPress={() => onRouteChange(index)}
            style={{
              textDecorationLine: currentRoute === page ? 'underline' : 'none',
            }}
            size="xl"
          >
            {page}
          </TextLink>
          {index < pages.length - 1 && (
            <ThemedText style={styles.separator}>|</ThemedText>
          )}
        </>
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
