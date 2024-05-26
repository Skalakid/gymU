// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
import { Colors } from "@/constants/Colors";
import Icons from "@/constants/Icons";
import { Image, ImageContentFit } from "expo-image";
import {
  ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from "react-native";

export type IconType = (typeof Icons)[keyof typeof Icons];

export type IconProps = {
  icon: IconType;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle & ImageStyle>;
  contentFit?: ImageContentFit;
};

const Icon = ({
  icon,
  color = Colors.white,
  size = 16,
  style,
  contentFit = "contain",
}: IconProps) => {
  return (
    <Image
      source={icon as ImageSourcePropType}
      style={[{ width: size, aspectRatio: 1 }, style]}
      contentFit={contentFit}
      tintColor={color}
    />
  );
};

export default Icon;
