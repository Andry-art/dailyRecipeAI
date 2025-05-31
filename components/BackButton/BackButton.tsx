import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const BackButton = () => {
  const handleBackPress = useCallback(() => {
    router.back();
  }, []);

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleBackPress}>
      <Feather name="arrow-left" size={24} />
    </TouchableOpacity>
  );
};

export default memo(BackButton);

const styles = StyleSheet.create({
  buttonContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(31, 31, 31, 0.2)",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 12,
  },
});
