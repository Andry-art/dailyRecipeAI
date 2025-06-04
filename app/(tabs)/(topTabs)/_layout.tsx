import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

import TopTabLabel from "@/components/TopTabLabel/TopTabLabel";
import { COLORS } from "@/constants/Colors";
import i18n from "@/i18n";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

const TopTabNav = createMaterialTopTabNavigator();

export const MaterialTobTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof TopTabNav.Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(TopTabNav.Navigator);

const TopTabs = () => {
  return (
    <SafeAreaView style={styles.flex}>
      <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" />
      <MaterialTobTabs
        screenOptions={{
          tabBarAllowFontScaling: true,
          tabBarStyle: styles.tabBarStyle,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
          tabBarInactiveTintColor: COLORS.accent,
          tabBarActiveTintColor: COLORS.secondary,
        }}
      >
        <MaterialTobTabs.Screen
          name="index"
          options={{
            tabBarLabel: ({ color }) => (
              <TopTabLabel
                color={color}
                iconName={"camera"}
                title={i18n.t("photo")}
              />
            ),
          }}
        />
        <MaterialTobTabs.Screen
          name="text"
          options={{
            tabBarLabel: ({ color }) => (
              <TopTabLabel
                color={color}
                iconName={"message-circle"}
                title={i18n.t("text")}
              />
            ),
          }}
        />
      </MaterialTobTabs>
    </SafeAreaView>
  );
};

export default TopTabs;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingTop: Platform.OS === "ios" ? 0 : 10,
  },
  tabBarStyle: {
    marginHorizontal: 16,
    backgroundColor: COLORS.secondary,
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.accent,
    marginTop: Platform.OS === "ios" ? 24 : 40,
    zIndex: 10,
  },
  tabBarIndicatorStyle: {
    backgroundColor: COLORS.accent,
    height: 42,
    borderRadius: 16,
    width: "48.9%",
    margin: 1,
  },
});
