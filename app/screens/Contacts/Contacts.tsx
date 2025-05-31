import AdBanner from "@/components/AdBanner/AdBanner";
import ContactButton from "@/components/ContactButton/ContactButton";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import i18n from "@/i18n";
import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

const Contacts = () => {
  const [isAdsDisable, setIsAdsDisable] = useState(false);

  const onPressAds = useCallback(() => {
    setIsAdsDisable((state) => !state);
  }, []);

  const onPressGoogle = useCallback(() => {
    Linking.openURL("mailto:dailyrecipeai@gmail.com");
    // dailyrecipeai@gmail.com
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{i18n.t("building")}</Text>
        <Text style={styles.subTitle}>{i18n.t("subscribe")}</Text>
      </View>

      <ContactButton
        title="Google"
        leftIcon={
          <FontAwesome name="google" size={24} color={COLORS.secondary} />
        }
        onPress={onPressGoogle}
      />

      {/* <ContactButton
        title={i18n.t("disable")}
        leftIcon={
          <MaterialCommunityIcons
            name="advertisements"
            size={24}
            color={COLORS.secondary}
          />
        }
        isAddButton
        isAdsDisable={isAdsDisable}
        onPress={onPressAds}
      /> */}
      <AdBanner />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 16,
  },
  textContainer: {
    marginBottom: 15,
  },
  title: {
    textAlign: "center",
    fontFamily: FONTS.medium,
    fontSize: 14,
    marginBottom: 5,
  },
  subTitle: {
    textAlign: "center",
    fontFamily: FONTS.regular,
    fontSize: 12,
  },
});
