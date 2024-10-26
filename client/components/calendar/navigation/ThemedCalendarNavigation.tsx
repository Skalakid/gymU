import ThemedText from '@/components/ThemedText';
import IconButton from '@/components/button/IconButton';
import { months } from '@/constants/Text';
import Icons from '@/constants/Icons';
import { View, StyleSheet, ViewStyle } from 'react-native';

const commonSize = 26;

type ThemedCalendarNavigationProps = {
  month: number;
  year: number;
  onNextPress?: () => void;
  onPrevPress?: () => void;
  style?: ViewStyle;
};

const ThemedCalendarNavigation = ({
  month,
  year,
  onPrevPress,
  onNextPress,
  style,
}: ThemedCalendarNavigationProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        <IconButton
          icon={Icons.arrowLeft}
          onPress={onPrevPress}
          size={commonSize}
        />
        <ThemedText weight="semiBold" size="h4" style={styles.text}>
          {months[month - 1]}
        </ThemedText>
      </View>
      <View style={styles.right}>
        <ThemedText weight="semiBold" size="h4" style={styles.text}>
          {year}
        </ThemedText>
        <IconButton
          icon={Icons.arrowRight}
          onPress={onNextPress}
          size={commonSize}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',

    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ThemedCalendarNavigation;
