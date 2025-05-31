import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { FC, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  icon?: ReactNode;
  onPress: () => void;
  isFill?: boolean;
}

const Button: FC<Props> = ({ title, icon, onPress, isFill = false }) => {
  return (
    <TouchableOpacity
      style={isFill ? styles.containerFill : styles.container}
      onPress={onPress}
    >
      {icon && icon}
      <Text style={isFill ? styles.titleFill : styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 16,
    width: "100%",
    marginBottom: 12,
  },
  containerFill: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 16,
    width: "100%",
    marginBottom: 12,
    backgroundColor: COLORS.accent,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.medium,
    marginLeft: 12,
  },
  titleFill: {
    fontSize: 20,
    fontFamily: FONTS.medium,
    marginLeft: 12,
    color: COLORS.secondary,
  },
});
