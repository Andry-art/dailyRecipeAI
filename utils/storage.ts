import { QUERY_KEYS } from "@/constants/QueryKeys";
import { TRecipeResponse } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import SparkMD5 from "spark-md5";

export const getItem = async (key: string): Promise<string | null> => {
  try {
    const response = await AsyncStorage.getItem(key);
    return response;
  } catch (error) {
    console.log("Error getItem AsyncStorage:", error);
    return null;
  }
};

export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error setItem AsyncStorage:", error);
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removeItem AsyncStorage:", error);
  }
};

export const fetchFromAsyncStorage = async () => {
  try {
    const value = await getItem(QUERY_KEYS.SavedItems);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.log("Get saved error:", e);
  }
};

export const addNewSaveItem = async (item: TRecipeResponse) => {
  try {
    const currentItems = await getItem(QUERY_KEYS.SavedItems);
    let newData = [];
    let transformToString = "";

    if (!currentItems) {
      newData = [item];
      transformToString = JSON.stringify(newData);
      setItem(QUERY_KEYS.SavedItems, transformToString);
      return newData;
    } else {
      const parseData = JSON.parse(currentItems);
      const exists = parseData.some(
        (recipe: TRecipeResponse) => recipe.title === item.title
      );
      if (exists) {
        const parseData = JSON.parse(currentItems);
        newData = parseData.filter(
          (recipe: TRecipeResponse) => recipe.title !== item.title
        );
        transformToString = JSON.stringify(newData);
        setItem(QUERY_KEYS.SavedItems, transformToString);
        return newData;
      } else {
        newData = [...parseData, item];
        transformToString = JSON.stringify(newData);
        setItem(QUERY_KEYS.SavedItems, transformToString);
        return newData;
      }
    }
  } catch (e) {
    console.log("add new Item error:", e);
  }
};

export const getCachedImageUri = async (title: string) => {
  const hash = SparkMD5.hash(title);
  const fileUri = FileSystem.cacheDirectory + `${hash}.png`;

  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  return fileInfo ? false : true;
};
