import ThemedView from '@/components/ThemedView';
import { IconType } from '@/components/common/Icon';
import Header from '@/components/navigation/Header';
import Icons from '@/constants/Icons';
import Images from '@/constants/Images';
import useTheme from '@/hooks/useTheme';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

type WorkoutDetailsPageProps = {
  children: React.ReactNode;
  title: string;
  onGoBack?: () => void;
  rightIcon?: IconType;
  rightIconOnPress?: () => void;
  image?: ImageSourcePropType;
  shouldFillFullHeight?: boolean;
};

const WorkoutModalPage = ({
  children,
  title,
  onGoBack = () => router.back(),
  rightIcon,
  rightIconOnPress,
  image,
  shouldFillFullHeight = false,
}: WorkoutDetailsPageProps) => {
  const theme = useTheme();

  return (
    <ThemedView style={{ flex: 1 }}>
      {!shouldFillFullHeight && (
        <Animated.View entering={FadeIn.delay(200).duration(500)}>
          <Image
            source={image || Images.workout_example_img}
            contentFit="cover"
            style={{ width: '100%', height: 200 }}
          />
          <LinearGradient
            colors={[theme.background, 'transparent']}
            style={styles.gradient}
          />
        </Animated.View>
      )}

      <View style={styles.container}>
        <Header
          title={title}
          style={[
            styles.header,
            {
              marginBottom: shouldFillFullHeight ? 0 : 120,
              paddingBottom: shouldFillFullHeight ? -20 : 0,
            },
          ]}
          leftIcon={Icons.arrowLeft}
          leftIconSize={32}
          leftIconOnPress={onGoBack}
          rightIcon={rightIcon}
          rightIconOnPress={rightIconOnPress}
          rightIconSize={24}
        />

        <Animated.View
          style={[styles.modal, { backgroundColor: theme.background }]}
          entering={SlideInDown}
        >
          {children}
        </Animated.View>
      </View>
    </ThemedView>
  );
};

export default WorkoutModalPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    paddingLeft: 10,
  },
  modal: {
    flex: 1,
    padding: 20,

    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 150,
  },
});
