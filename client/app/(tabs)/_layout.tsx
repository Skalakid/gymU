import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon } from "@/components/Icon";
import Icons from "@/constants/Icons";
import BottomTabIcon from "@/components/navigation/BottomTabIcon";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: styles.tabNavigator,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <BottomTabIcon
              icon={focused ? Icons.homeFill : Icons.home}
              name="Home"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <BottomTabIcon
              icon={Icons.calendar}
              name="Calendar"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color }) => (
            <BottomTabIcon icon={Icons.bolt} name="Workouts" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <BottomTabIcon icon={Icons.safari} name="Explore" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color, focused }) => (
            <BottomTabIcon
              icon={focused ? Icons.chartFill : Icons.chart}
              name="Statistics"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabNavigator: {
    paddingBottom: 0,
    height: 52,
  },
});
