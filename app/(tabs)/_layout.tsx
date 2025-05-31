import { COLORS } from "@/constants/Colors";
import i18n from "@/i18n";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const BottomTabs = () => {
  return (
    <Tabs
      initialRouteName="(topTabs)"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopWidth: 0,
          display: "flex",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="saved"
        options={{
          title: "",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerTitle: i18n.t("saved"),
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={focused ? styles.iconContainerFocus : styles.iconContainer}
            >
              <Feather
                name="bookmark"
                size={24}
                color={focused ? COLORS.secondary : COLORS.accent}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(topTabs)"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={focused ? styles.iconContainerFocus : styles.iconContainer}
            >
              <Ionicons
                name="sparkles-outline"
                size={24}
                color={focused ? COLORS.secondary : COLORS.accent}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: "",
          headerTitle: i18n.t("contacts"),
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={focused ? styles.iconContainerFocus : styles.iconContainer}
            >
              <Feather
                name="message-circle"
                size={24}
                color={focused ? COLORS.secondary : COLORS.accent}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  iconContainerFocus: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: COLORS.accent,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "transparent",
  },
});
