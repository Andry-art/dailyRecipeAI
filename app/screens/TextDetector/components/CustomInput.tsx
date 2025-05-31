import { COLORS } from "@/constants/Colors";
import i18n from "@/i18n";
import { Feather } from "@expo/vector-icons";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  setIngredients: Dispatch<SetStateAction<string>>;
}

const CustomInput: FC<Props> = ({ setIngredients }) => {
  const [text, setText] = useState("");

  const onSubmit = useCallback(() => {
    const trimedText = text.trim();
    Keyboard.dismiss();
    setIngredients(trimedText);
  }, [text]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={text}
        style={styles.inputWidth}
        placeholder={i18n.t("type_ingredients")}
        onChangeText={setText}
      />
      <TouchableOpacity
        style={
          text
            ? styles.inputButtonContainer
            : styles.inputButtonContainerDisabled
        }
        onPress={onSubmit}
        disabled={!text}
      >
        <Feather name="arrow-up" size={24} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: 55,
    width: "auto",
    borderWidth: 1,
    borderColor: "rgba(229, 229, 234, 1)",
    borderRadius: 16,
    flexDirection: "row",
    paddingHorizontal: 12,
    marginHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    marginTop: 5,
    justifyContent: "space-between",
  },
  inputWidth: {
    width: "85%",
  },
  inputButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: COLORS.accent,
  },
  inputButtonContainerDisabled: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "rgba(31, 31, 31, 0.2)",
  },
});
