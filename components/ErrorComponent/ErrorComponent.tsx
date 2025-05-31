import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import i18n from "@/i18n";
import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  isError: boolean | null;
  isText?: boolean;
}

const ErrorComponent: FC<Props> = ({ isError, isText }) => {
  return (
    <View style={[styles.errorContainer, { opacity: isError ? 1 : 0 }]}>
      <Text style={styles.errorTitle}>{i18n.t("problem")}</Text>
      {isText ? (
        <Text style={styles.errorDescription}>{i18n.t("rewrite")}</Text>
      ) : (
        <Text style={styles.errorDescription}>{i18n.t("retake")}</Text>
      )}
    </View>
  );
};

export default memo(ErrorComponent);

const styles = StyleSheet.create({
  errorContainer: {
    marginHorizontal: 16,
    marginTop: 40,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: COLORS.accent,
    textAlign: "center",
    marginBottom: 16,
  },
  errorDescription: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.accent,
    textAlign: "center",
  },
});
