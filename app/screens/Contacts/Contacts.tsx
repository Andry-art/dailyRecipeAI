import AdBanner from "@/components/AdBanner/AdBanner";
import ContactButton from "@/components/ContactButton/ContactButton";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import i18n from "@/i18n";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useCallback, useRef } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import DonateModal from "./components/DonateModal";

const Contacts = () => {
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const onPressGoogle = useCallback(() => {
    Linking.openURL("mailto:dailyrecipeai@gmail.com");
    // dailyrecipeai@gmail.com
  }, []);

  const onPressDonate = useCallback(() => {
    bottomSheetModalRef.current?.present();
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

      <ContactButton
        title={i18n.t("donate")}
        leftIcon={
          <FontAwesome name="dollar" size={24} color={COLORS.secondary} />
        }
        onPress={onPressDonate}
      />

      <DonateModal bottomSheetModalRef={bottomSheetModalRef} />
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
