import ThemedView from '@/components/ThemedView';
import { StyleSheet, ViewStyle } from 'react-native';
import Header from '../navigation/Header';
import { IconType } from '../Icon';
import Icons from '@/constants/Icons';
import { router } from 'expo-router';

type PageWithGoBackHeaderProps = {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
  rightIcon?: IconType;
  rightIconOnPress?: () => void;
  rightIconColor?: string;
  rightIconSize?: number;
};

const PageWithGoBackHeader = ({
  children,
  style,
  title,
}: PageWithGoBackHeaderProps) => {
  return (
    <ThemedView style={styles.container}>
      <Header
        title={title}
        style={{ paddingLeft: 10 }}
        leftIcon={Icons.arrowLeft}
        leftIconSize={32}
        leftIconOnPress={() => router.back()}
      />
      <ThemedView style={[styles.content, style]}>{children}</ThemedView>
    </ThemedView>
  );
};

export default PageWithGoBackHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
