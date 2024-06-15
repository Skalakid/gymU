import { StyleSheet, View, ViewStyle } from 'react-native';
import ThemedView from '../ThemedView';
import ThemedText from '../ThemedText';
import IconButton from '../button/IconButton';
import { IconType } from '../Icon';

export type HeaderProps = {
  title?: string;
  leftIcon?: IconType;
  leftIconOnPress?: () => void;
  leftIconColor?: string;
  leftIconSize?: number;
  rightIcon?: IconType;
  rightIconOnPress?: () => void;
  rightIconColor?: string;
  rightIconSize?: number;
  style?: ViewStyle;
};

const Header = ({
  title,
  leftIcon,
  leftIconOnPress,
  leftIconColor,
  leftIconSize,
  rightIcon,
  rightIconOnPress,
  rightIconColor,
  rightIconSize,
  style,
}: HeaderProps) => {
  return (
    <ThemedView style={[styles.container, style]}>
      {leftIcon && (
        <IconButton
          icon={leftIcon}
          onPress={leftIconOnPress}
          color={leftIconColor}
          size={leftIconSize}
        />
      )}
      <View style={styles.text}>
        <ThemedText weight="semiBold" size="h4">
          {title}
        </ThemedText>
      </View>
      {rightIcon && (
        <IconButton
          icon={rightIcon}
          onPress={rightIconOnPress}
          color={rightIconColor}
          size={rightIconSize}
        />
      )}
    </ThemedView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  text: {
    flex: 1,

    justifyContent: 'center',
  },
});
