import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import i18n from "@/i18n";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { FC, memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress: () => void;
  image: string;
}

const PhotoButton: FC<Props> = ({ onPress, image }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <BlurView intensity={100} style={styles.blurContainer}>
          <LinearGradient
            colors={["rgba(255, 107, 107, 0.2)", "rgba(78, 205, 196, 0.2)"]}
            start={{ x: 0.1, y: 0.9 }}
            end={{ x: 0.9, y: 0.1 }}
            style={styles.gradientShadow}
          />
        </BlurView>
        {image ? (
          <Image source={{ uri: image }} style={styles.card} />
        ) : (
          <View style={styles.card}>
            <Text style={styles.text}>{i18n.t("add_photo")}</Text>
            <Feather name="camera" size={24} color="black" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default memo(PhotoButton);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: 20,
  },
  gradientShadow: {
    width: 230,
    height: 230,
    borderRadius: 56,
    opacity: 0.3,
    zIndex: 0,
  },
  card: {
    width: 215,
    height: 215,
    borderRadius: 56,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",

    zIndex: 1,
    shadowColor: "#a58e8e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  text: {
    marginTop: 8,
    fontFamily: FONTS.medium,
    marginBottom: 8,
    width: "100%",
    textAlign: "center",
  },
  blurContainer: {
    position: "absolute",
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 56,
  },
});
