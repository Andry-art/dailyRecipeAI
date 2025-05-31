import AdBanner from "@/components/AdBanner/AdBanner";
import Button from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import i18n from "@/i18n";
import { router } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

const EmptyScreen = () => {
  const toMainScreen = useCallback(() => {
    router.push({
      pathname: "/",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("empty_title")}</Text>
      <Text style={styles.subTitle}>{i18n.t("empty_subtitle")}</Text>
      <Button title={i18n.t("back_search")} onPress={toMainScreen} isFill />
      <AdBanner />
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  subTitle: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
});
