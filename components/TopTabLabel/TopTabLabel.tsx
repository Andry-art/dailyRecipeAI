import { FONTS } from "@/constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  color: string;
  iconName: keyof typeof Feather.glyphMap;
  title: string;
}

const TopTabLabel: FC<Props> = ({ color, iconName, title }) => {
  return (
    <View style={styles.container}>
      <Feather
        color={color}
        size={24}
        name={iconName}
        style={styles.tabBarIconStyle}
      />
      <Text style={[styles.tabBarTextStyle, { color }]}>{title}</Text>
    </View>
  );
};
export default TopTabLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabBarTextStyle: {
    fontSize: 13,
    letterSpacing: 0.06,
    bottom: 3,
    fontFamily: FONTS.medium,
  },
  tabBarIconStyle: {
    bottom: 4,
    right: 12,
  },
});
