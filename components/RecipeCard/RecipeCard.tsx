import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { TRecipeResponse } from "@/constants/types";
import i18n from "@/i18n";
import { Feather } from "@expo/vector-icons";
import React, { FC, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: TRecipeResponse;
  onPress: (item: TRecipeResponse) => void;
  isSaved?: boolean;
  onPressSave: (item: TRecipeResponse) => void;
}

const RecipeCard: FC<Props> = ({ item, onPress, isSaved, onPressSave }) => {
  const handlePress = useCallback(() => {
    onPress(item);
  }, [item]);

  const handleSave = useCallback(() => {
    onPressSave(item);
  }, [item]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
          style={isSaved ? styles.saveContanerSaved : styles.saveContaner}
          onPress={handleSave}
        >
          <Feather
            name="bookmark"
            size={24}
            color={isSaved ? COLORS.secondary : COLORS.accent}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.subtitle}>{i18n.t("ingredients")}</Text>
        <Text style={styles.description}>{item.products}</Text>
      </View>

      <View>
        <Text style={styles.subtitle}>{i18n.t("cook")}</Text>
        <Text style={styles.description}>{item.instruction}</Text>
      </View>
      <Text style={styles.readMore}>{i18n.t("read_more")}</Text>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 16,
    marginVertical: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    width: "60%",
  },
  saveContaner: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(31, 31, 31, 0.2)",
  },
  saveContanerSaved: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(31, 31, 31, 0.2)",
    backgroundColor: COLORS.accent,
  },
  descriptionContainer: {
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 16,
  },
  readMore: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    marginTop: 10,
  },
});
