import AdBanner from "@/components/AdBanner/AdBanner";
import Skeleton from "@/components/Skeleton/Skeleton";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { TRecipeResponse } from "@/constants/types";
import { useAddSave } from "@/hooks/useAddSave";
import { useFullDescription } from "@/hooks/useFullDescription";
import { useGetSaved } from "@/hooks/useGetSaved";
import { useMealImage } from "@/hooks/useMealImage";
import i18n from "@/i18n";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SparkMD5 from "spark-md5";
import HowCookSkeleton from "./components/HowCookSkeleton";
import IngredientceSkeleton from "./components/IngredientceSkeleton";

const RecipeDescription = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [imageUri, setImageUri] = useState<string>("");
  const { data: savedItems } = useGetSaved();
  const { mutate } = useAddSave();
  const { item: rawItem } = useLocalSearchParams();
  const item = typeof rawItem === "string" ? rawItem : JSON.stringify(rawItem);
  const parsedItem = item ? JSON.parse(item as string) : null;
  const {
    data: base64Image,
    isLoading: isImageLoading,
    isFetching,
  } = useMealImage(parsedItem?.title, parsedItem?.products, shouldFetch);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: [(QUERY_KEYS.MealImage, parsedItem?.title)],
        exact: true,
      });
    };
  }, []);

  useEffect(() => {
    const getCachedImageUri = async () => {
      const hash = SparkMD5.hash(parsedItem?.title);
      const fileUri = FileSystem.cacheDirectory + `${hash}.png`;

      const info = await FileSystem.getInfoAsync(fileUri);

      if (!info.exists) {
        setShouldFetch(true);
      } else {
        setImageUri(fileUri);
      }
    };
    getCachedImageUri();
  }, [parsedItem?.title, rawItem]);

  useEffect(() => {
    const saveToCache = async () => {
      try {
        const hash = SparkMD5.hash(parsedItem?.title);
        const fileUri = FileSystem.cacheDirectory + `${hash}.png`;
        if (base64Image) {
          const cleanBase64 = base64Image.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          await FileSystem.writeAsStringAsync(fileUri, cleanBase64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageUri(fileUri);
        }
      } catch (err) {
        console.error("saveToCache Image:", err);
      }
    };
    saveToCache();
  }, [base64Image]);

  const isSaved = useMemo(
    () =>
      savedItems?.some(
        (recipe: TRecipeResponse) => recipe.title === parsedItem.title
      ),
    [parsedItem.title, savedItems]
  );

  const onPressSave = useCallback(() => {
    mutate(parsedItem);
  }, [parsedItem]);

  const { data: description, isLoading } = useFullDescription(
    item,
    parsedItem?.title
  );

  useEffect(() => {
    navigation.setOptions({
      title: parsedItem?.title,
      headerRight: () => (
        <TouchableOpacity
          style={isSaved ? styles.saveContanerFill : styles.saveContaner}
          onPress={onPressSave}
        >
          <Feather
            name="bookmark"
            size={24}
            color={isSaved ? COLORS.secondary : COLORS.accent}
          />
        </TouchableOpacity>
      ),
    });
  }, [parsedItem?.title, isSaved]);

  return (
    <ScrollView style={styles.container}>
      {isImageLoading || isFetching ? (
        <Skeleton isLoading height={200} br={16} />
      ) : imageUri ? (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
      ) : null}

      <AdBanner />

      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>{i18n.t("ingredients")}</Text>
        {isLoading ? (
          <IngredientceSkeleton />
        ) : (
          description?.products.map((item: string, i: number) => (
            <Text key={i} style={styles.description}>
              -{item}
            </Text>
          ))
        )}
      </View>
      <View
        style={[
          styles.textContainer,
          { paddingBottom: Platform.OS === "ios" ? 0 : 40 },
        ]}
      >
        <Text style={styles.subtitle}>{i18n.t("cook")}</Text>
        {isLoading ? (
          <HowCookSkeleton />
        ) : (
          description?.instruction.map((item: string, i: number) => (
            <Text key={i} style={styles.descriptionHowToCook}>
              - {item}
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 16,
    marginBottom: 30,
  },
  image: {
    height: 200,
    borderRadius: 16,
  },
  textContainer: {
    marginTop: 20,
  },
  subtitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 16,
  },
  descriptionHowToCook: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    marginBottom: 10,
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
  saveContanerFill: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(31, 31, 31, 0.2)",
    backgroundColor: COLORS.accent,
  },
});
