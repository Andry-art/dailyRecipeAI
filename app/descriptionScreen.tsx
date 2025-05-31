import { COLORS } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import RecipeDescription from "./screens/RecipeDescription/RecipeDescription";

const descriptionScreen = () => {
  return (
    <View style={styles.container}>
      <RecipeDescription />
    </View>
  );
};

export default descriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
});
