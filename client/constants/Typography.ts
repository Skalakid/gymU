import { TextStyle } from "react-native";

const BASE: TextStyle = {
  fontSize: 16,
};

const WeightPresets: Record<string, TextStyle> = {
  bold: {
    fontWeight: "700",
  },
  semiBold: {
    fontWeight: "600",
  },
  medium: {
    fontWeight: "500",
  },
  regular: {
    fontWeight: "400",
  },
  light: {
    fontWeight: "300",
  },
};

const SizePresets: Record<string, TextStyle> = {
  default: BASE,
  xxs: {
    fontSize: 8,
  },
  xs: {
    fontSize: 10,
  },
  s: {
    fontSize: 12,
  },
  m: {
    fontSize: 14,
  },
  l: {
    fontSize: 16,
  },
  xl: {
    fontSize: 18,
  },
  xxl: {
    fontSize: 20,
  },
  h1: {
    ...WeightPresets.bold,
    fontSize: 40,
    lineHeight: 40,
  },
  h2: {
    ...WeightPresets.bold,
    fontSize: 32,
    lineHeight: 32,
  },
  h3: {
    ...WeightPresets.bold,
    fontSize: 30,
    lineHeight: 30,
  },
  h4: {
    ...WeightPresets.bold,
    fontSize: 24,
    lineHeight: 24,
  },
  link: {
    textDecorationLine: "underline",
    color: "blue",
  },
};

export { SizePresets, WeightPresets };
