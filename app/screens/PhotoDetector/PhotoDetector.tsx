import AdBanner from "@/components/AdBanner/AdBanner";
import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton/RecipeCardSkeleton";
import { COLORS } from "@/constants/Colors";
import { TRecipeResponse } from "@/constants/types";
import { useAddSave } from "@/hooks/useAddSave";
import { useGetSaved } from "@/hooks/useGetSaved";
import { usePhotoRequest } from "@/hooks/usePhotoRequest";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ImageModal from "./components/ImageModal";
import PhotoButton from "./components/PhotoButton";

const PhotoDetector = () => {
  const [image, setImage] = useState<{ url: string; base64: string }>({
    url: "",
    base64: "",
  });
  const scrollViewRef = useRef<ScrollView>(null);

  const { data, error, isLoading } = usePhotoRequest(image.base64);
  const { data: savedItems } = useGetSaved();

  const { mutate } = useAddSave();
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const handlePresentModalPress = useCallback(async () => {
    if (image.url) {
      setImage({ url: "", base64: "" });
    } else {
      bottomSheetModalRef.current?.present();
    }
  }, [image.url]);

  const openCamera = useCallback(async () => {
    bottomSheetModalRef.current?.close();
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        quality: 0.5,
      });
      if (!result.canceled && result.assets[0].uri) {
        const base64 = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: "base64",
          }
        );
        bottomSheetModalRef.current?.close();

        setImage({ url: result.assets[0].uri, base64: base64 });
      }
    } catch (e) {
      console.log("openCamera error:", e);
    }
  }, []);

  const openGallery = useCallback(async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 0.5,
      });
      if (!result.canceled && result.assets[0].uri) {
        const base64 = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: "base64",
          }
        );
        bottomSheetModalRef.current?.close();
        setImage({ url: result.assets[0].uri, base64: base64 });
      }
    } catch (e) {
      console.log("openGallery error:", e);
    }
  }, []);

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
    <ScrollView
      style={styles.container}
      ref={scrollViewRef}
      onContentSizeChange={(contentHeight) => {
        if (data || isLoading) {
          scrollViewRef.current?.scrollTo({
            y: contentHeight / 3,
            animated: true,
          });
        }
      }}
    >
      <AdBanner />
      <ErrorComponent isError={!!error} />
      <PhotoButton onPress={handlePresentModalPress} image={image.url} />
      <ImageModal
        bottomSheetModalRef={bottomSheetModalRef}
        openCamera={openCamera}
        openGallery={openGallery}
      />
      <View style={styles.recipeContainer}>
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
      </View>
    </ScrollView>
  );
};

export default PhotoDetector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  recipeContainer: {
    marginHorizontal: 16,
    marginTop: 40,
  },
});
