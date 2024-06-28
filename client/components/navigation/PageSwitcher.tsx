import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import TextLink from '../common/TextLink';
import { useRouter } from 'expo-router';

export type PageSwitcherItem = {
  name: string;
  href: string;
};

type PageSwitcherProps = {
  pages: PageSwitcherItem[];
  currentRoute: string;
};

const PageSwitcher = ({ pages, currentRoute }: PageSwitcherProps) => {
  const router = useRouter();

  return (
    <View style={styles.switcher}>
      {pages.map((page, index) => (
        <>
          <TextLink
            onPress={() => router.navigate(page.href)}
            style={{
              textDecorationLine:
                currentRoute === page.href ? 'underline' : 'none',
            }}
            size="xl"
          >
            {page.name}
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
