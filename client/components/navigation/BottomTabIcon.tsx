import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "../Icon";
import Icons from "@/constants/Icons";
import { Colors } from "@/constants/Colors";

type BottomTabIcon = {
  name: string;
  icon: (typeof Icons)[keyof typeof Icons];
  focused?: boolean;
  color?: string;
};

export default function BottomTabIcon({
  name,
  icon,
  color = Colors.light.tabIconDefault,
}: BottomTabIcon) {
  return (
    <View style={styles.container}>
      <Icon icon={icon} size={24} color={color} />
      <Text style={[{ color: color }, styles.text]}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  text: {
    fontSize: 10,
  },
});
