import { LinearGradient } from "expo-linear-gradient"; // 💡 добавлено
import { FC, memo, useCallback, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type Interpolation = Animated.AnimatedInterpolation<number | string>;
type TStyle = "gray" | "light" | "dark" | "green";

interface Props {
  width?: number;
  height?: number;
  isLoading: boolean;
  children?: React.ReactNode;
  style?: TStyle;
  containerStyle?: ViewStyle;
  mt?: number;
  br?: number;
  animatedWidth?: Interpolation;
  animatedHeight?: Interpolation;
  animatedMt?: Interpolation;
  animatedBr?: Interpolation;
  ml?: number;
  mb?: number;
}

const getColor = (style: TStyle, type: string): string => {
  if (style === "dark") {
    return type === "background" ? "#EDEDED" : "#CEE7D2";
  }

  if (type === "background") {
    return style === "gray"
      ? "rgba(182, 197, 217, 0.3)"
      : style === "green"
      ? "#34C759"
      : "rgba(133, 154, 181, 0.3)";
  }

  return style === "gray"
    ? "rgba(182, 197, 217, 0.1)"
    : "rgba(255, 255, 255, 0.2)";
};

const SkeletonComponent: FC<Props> = ({
  width,
  height,
  containerStyle,
  isLoading,
  children,
  style = "gray",
  mt = 0,
  br = 21,
  animatedWidth,
  animatedHeight,
  animatedMt,
  animatedBr,
  ml = 0,
  mb = 0,
}) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const getOutputRange = useCallback((): number[] => {
    if (width && typeof width === "number") {
      return [-width, width * 1.5];
    }

    const dim = Dimensions.get("window");

    return [-dim.width, dim.width];
  }, [width]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: getOutputRange(),
  });

  const backgroundColor = getColor(style, "background");

  if (isLoading) {
    return (
      <Animated.View
        style={[
          containerStyle,
          styles.container,
          {
            height: animatedHeight || height,
            width: animatedWidth || width,
            backgroundColor,
            marginTop: animatedMt || mt,
            borderRadius: animatedBr || br,
            marginLeft: ml,
            marginBottom: mb,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.gradientWrapper,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.1)", "transparent"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradient}
          />
        </Animated.View>
      </Animated.View>
    );
  }

  return <View>{children}</View>;
};

export default memo(SkeletonComponent);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#EDEDED",
  },
  gradientWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
});
