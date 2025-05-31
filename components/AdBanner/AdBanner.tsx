import React, { useCallback } from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";

const AdBanner = () => {
  const handleNavigation = useCallback(() => {
    Linking.openURL(
      "https://www.profitableratecpm.com/rrm5kdb87?key=f1dea36960ca72bb9cf662bea3dca048"
    ).catch((err) => console.warn("Не удалось открыть ссылку:", err));
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigation}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: "https://andry-art.github.io/ad-host/" }}
        style={{ flex: 1, width: 350, height: 50 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={false}
      />
      <View style={styles.overlay} pointerEvents="auto" />
    </TouchableOpacity>
  );
};

export default AdBanner;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
});
