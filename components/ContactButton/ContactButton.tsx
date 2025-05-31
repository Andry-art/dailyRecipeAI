import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { FC, JSX } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  leftIcon: JSX.Element;
  isAddButton?: boolean;
  isAdsDisable?: boolean;
  onPress: () => void;
}

const ContactButton: FC<Props> = ({
  title,
  leftIcon,
  isAddButton = false,
  isAdsDisable,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleContainer}>
        <View style={styles.leftIconContainer}>{leftIcon}</View>
        <Text style={styles.title}>{title}</Text>
      </View>
      {isAddButton ? (
        <Switch
          trackColor={{
            true: COLORS.accent,
          }}
          value={isAdsDisable}
        />
      ) : (
        <View style={styles.rightIconContainer}>
          <Feather name="arrow-up-right" size={24} color={COLORS.secondary} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ContactButton;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: 20,
  },
  leftIconContainer: {
    backgroundColor: COLORS.accent,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rightIconContainer: {
    backgroundColor: COLORS.accent,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
