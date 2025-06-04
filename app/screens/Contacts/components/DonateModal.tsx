import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Linking, StyleSheet, Text } from "react-native";

import Button from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import i18n from "@/i18n";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { FC, memo, useCallback } from "react";

interface Props {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods | null>;
}

const DonateModal: FC<Props> = ({ bottomSheetModalRef }) => {
  const openCardDonate = useCallback(() => {
    Linking.openURL("https://buymeacoffee.com/dailyrecipeai");
  }, []);

  const openCryptoDonate = useCallback(() => {
    Linking.openURL("https://nowpayments.io/donation/dailyRecipeAI");
  }, []);

  return (
    <BottomSheetModal
      stackBehavior="push"
      style={{ zIndex: 100 }}
      ref={bottomSheetModalRef}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.modalTitle}>{i18n.t("donate_thanks")}</Text>

        <Button
          title={i18n.t("card")}
          icon={<Feather name="credit-card" size={24} />}
          onPress={openCardDonate}
        />
        <Button
          title={i18n.t("crypto")}
          icon={
            <MaterialCommunityIcons name="ethereum" size={24} color="black" />
          }
          onPress={openCryptoDonate}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default memo(DonateModal);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    height: 300,
    marginHorizontal: 16,
  },
  modalTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 45,
  },
});
