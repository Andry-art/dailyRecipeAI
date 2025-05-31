import AdBanner from "@/components/AdBanner/AdBanner";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { TRecipeResponse } from "@/constants/types";
import { useAddSave } from "@/hooks/useAddSave";
import { useGetSaved } from "@/hooks/useGetSaved";
import i18n from "@/i18n";
import { router } from "expo-router";
import { useCallback } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import EmptyScreen from "./components/EmptyScreen";

const Saved = () => {
  const { mutate } = useAddSave();
  const { data } = useGetSaved();
  const onPressCard = useCallback((item: TRecipeResponse) => {
    router.push({
      pathname: "/descriptionScreen",
      params: {
        item: JSON.stringify(item),
      },
    });
  }, []);

  const onPressSave = useCallback((item: TRecipeResponse) => {
    mutate(item);
  }, []);

  return (
    <>
      {data && data?.length ? (
        <ScrollView style={styles.container}>
          <Text style={styles.hint}>{i18n.t("saved_locally")}</Text>
          <AdBanner />

          {data?.map((item: TRecipeResponse, index: number) => (
            <RecipeCard
              item={item}
              key={index}
              onPress={onPressCard}
              isSaved
              onPressSave={onPressSave}
            />
          ))}
          <AdBanner />
        </ScrollView>
      ) : (
        <EmptyScreen />
      )}
    </>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 16,
  },
  hint: {
    textAlign: "center",
    marginBottom: 12,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
});
