import { Feather } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { StyleSheet, Text } from "react-native";

import Button from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import i18n from "@/i18n";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { FC, memo } from "react";

interface Props {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods | null>;
  openCamera: () => void;
  openGallery: () => void;
}

const ImageModal: FC<Props> = ({
  bottomSheetModalRef,
  openCamera,
  openGallery,
}) => {
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
        <Text style={styles.modalTitle}>{i18n.t("how_upload")}</Text>

        <Button
          title={i18n.t("open_camera")}
          icon={<Feather name="camera" size={24} />}
          onPress={openCamera}
        />
        <Button
          title={i18n.t("open_gallery")}
          icon={<Feather name="image" size={24} />}
          onPress={openGallery}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default memo(ImageModal);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    height: 270,
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
