import AdBanner from "@/components/AdBanner/AdBanner";
import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton/RecipeCardSkeleton";
import { COLORS } from "@/constants/Colors";
import { TRecipeResponse } from "@/constants/types";
import { useAddSave } from "@/hooks/useAddSave";
import { useGetSaved } from "@/hooks/useGetSaved";
import { useTextRequest } from "@/hooks/useTextRequest";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomInput from "./components/CustomInput";

const TextDetector = () => {
  const [ingredients, setIngredients] = useState("");

  const { data, error, isLoading } = useTextRequest(ingredients);
  const { data: savedItems } = useGetSaved();

  const { mutate } = useAddSave();

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={"padding"}
      keyboardVerticalOffset={130}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <AdBanner />

          <ScrollView style={styles.scrollContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <ErrorComponent isError={!!error} isText />
              </View>
            )}

            {isLoading ? (
              <RecipeCardSkeleton />
            ) : (
              data?.map((item: TRecipeResponse, index: number) => {
                const isSaved = savedItems?.find(
                  (saved: TRecipeResponse) => saved.title === item.title
                );
                return (
                  <RecipeCard
                    item={item}
                    key={index}
                    onPress={onPressCard}
                    onPressSave={onPressSave}
                    isSaved={isSaved}
                  />
                );
              })
            )}
          </ScrollView>
          <CustomInput setIngredients={setIngredients} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TextDetector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 16,
  },
  errorContainer: {
    marginTop: 180,
  },
  recipeContainer: {
    marginHorizontal: 16,
    marginTop: 40,
  },
});

const ggg = {
  Brand: "xiaomi",
  Fingerprint:
    "xiaomi/lavender/lavender:9/PKQ1.180904.001/V10.3.6.0.PFGMIXM:user/release-keys",
  Manufacturer: "Xiaomi",
  Model: "Redmi Note 7",
  Release: "9",
  Serial: "unknown",
  Version: 28,
  isTesting: false,
  reactNativeVersion: { major: 0, minor: 79, patch: 2, prerelease: null },
  uiMode: "normal",
};
