import { useRef } from 'react';
import { I18nManager, StyleSheet, ViewStyle } from 'react-native';
import {
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from '../Icon';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';

type DeleteAndEditSwipeableProps = {
  children: React.ReactNode;
  rightActionContainerStyle?: ViewStyle;
  leftActionContainerStyle?: ViewStyle;
  rightThreshold?: number;
  leftThreshold?: number;
  friction?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  style?: ViewStyle;
};

type RightActionProps = {
  dragX: SharedValue<number>;
  swipeableRef: React.RefObject<SwipeableMethods>;
  style?: ViewStyle;
};

const LeftAction = ({ dragX, swipeableRef, style }: RightActionProps) => {
  const theme = useTheme();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(dragX.value, [0, 80], [0, 1], Extrapolation.CLAMP),
      },
    ],
  }));

  return (
    <RectButton
      style={[styles.leftAction, { backgroundColor: theme.primary }, style]}
      onPress={() => swipeableRef.current!.close()}
    >
      <Animated.View style={[styles.actionIcon, animatedStyle]}>
        <Icon icon={Icons.edit} size={24} color="white" />
      </Animated.View>
    </RectButton>
  );
};

const RightAction = ({ dragX, swipeableRef, style }: RightActionProps) => {
  const theme = useTheme();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(dragX.value, [-80, 0], [1, 0], Extrapolation.CLAMP),
      },
    ],
  }));

  return (
    <RectButton
      style={[styles.rightAction, { backgroundColor: theme.error }, style]}
      onPress={() => swipeableRef.current!.close()}
    >
      <Animated.View style={[styles.actionIcon, animatedStyle]}>
        <Icon icon={Icons.trash} size={24} color="white" />
      </Animated.View>
    </RectButton>
  );
};

const DeleteAndEditSwipeable = ({
  children,
  rightActionContainerStyle,
  leftActionContainerStyle,
  rightThreshold = 40,
  leftThreshold = 40,
  friction = 2,
  onSwipeLeft,
  onSwipeRight,
  style,
}: DeleteAndEditSwipeableProps) => {
  const swipeableRow = useRef<SwipeableMethods>(null);
  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRow}
        friction={friction}
        enableTrackpadTwoFingerGesture
        rightThreshold={rightThreshold}
        onSwipeableWillOpen={(direction) => {
          if (direction === 'left') {
            onSwipeLeft?.();
          } else {
            onSwipeRight?.();
          }
        }}
        onSwipeableOpen={() => swipeableRow.current!.close()}
        renderRightActions={(_, progress) => (
          <RightAction
            dragX={progress}
            swipeableRef={swipeableRow}
            style={rightActionContainerStyle}
          />
        )}
        leftThreshold={leftThreshold}
        renderLeftActions={(_, progress) => (
          <LeftAction
            dragX={progress}
            swipeableRef={swipeableRow}
            style={leftActionContainerStyle}
          />
        )}
        containerStyle={style}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default DeleteAndEditSwipeable;

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftAction: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  rightAction: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
});
