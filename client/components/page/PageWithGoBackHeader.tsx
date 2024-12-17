import ThemedView from '@/components/ThemedView';
import { StyleSheet, ViewStyle } from 'react-native';
import Header from '../navigation/Header';
import { IconType } from '../common/Icon';
import Icons from '@/constants/Icons';
import { router } from 'expo-router';

type PageWithGoBackHeaderProps = {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  rightIcon?: IconType;
  rightIconOnPress?: () => void;
  rightIconColor?: string;
  rightIconSize?: number;
};

const PageWithGoBackHeader = ({
  children,
  style,
  headerStyle = {},
  title,
  ...rest
}: PageWithGoBackHeaderProps) => {
  return (
    <ThemedView style={styles.container}>
      <Header
        title={title}
        style={[{ paddingLeft: 10 }, headerStyle]}
        leftIcon={Icons.arrowLeft}
        leftIconSize={32}
        leftIconOnPress={() => router.back()}
        {...rest}
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
