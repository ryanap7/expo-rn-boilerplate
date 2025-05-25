import Color from "@/constants/Color";
import Radius from "@/constants/Radius";
import GlobalStyles from "@/styles/common";
import { ThemedShimmerProps } from "@/types/components";
import { scale, verticalScale } from "@/utils/scaleSize";
import { IcImage } from "@assets/icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

const ThemedShimmer: React.FC<ThemedShimmerProps> = React.memo(
  ({ type = "default", width = 200, height = 100, borderRadius }) => {
    const translateX = useSharedValue(-screenWidth);

    useEffect(() => {
      translateX.value = withRepeat(
        withTiming(screenWidth, {
          duration: 1600,
          easing: Easing.linear,
        }),
        -1,
        true
      );
    }, [translateX]);

    const shimmerStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    const scaledWidth = useMemo(() => scale(width), [width]);
    const scaledHeight = useMemo(() => verticalScale(height), [height]);

    const calculatedRadius = useMemo(
      () => Math.min(scaledWidth, scaledHeight) * 0.08,
      [scaledWidth, scaledHeight]
    );

    const resolvedBorderRadius = useMemo(() => {
      if (!borderRadius) return calculatedRadius;
      return Radius[borderRadius] ?? calculatedRadius;
    }, [borderRadius, calculatedRadius]);

    const iconSize = useMemo(
      () => Math.min(scale(width), verticalScale(height)) * 0.25,
      [width, height]
    );

    return (
      <View
        style={[
          styles.container,
          {
            width: scaledWidth,
            height: scaledHeight,
            borderRadius: resolvedBorderRadius,
          },
        ]}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: Color.Gray[300] },
          ]}
        />

        {/* Shimmer effect */}
        <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
          <LinearGradient
            colors={["transparent", Color.Gray[200], "transparent"]}
            locations={[0.35, 0.5, 0.65]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
        </Animated.View>

        {type === "image" && (
          <View
            style={[
              styles.imagePlaceholder,
              GlobalStyles.center,
              {
                width: iconSize,
                height: iconSize,
                borderRadius: iconSize * 0.2,
                top: "50%",
                transform: [{ translateY: -iconSize / 2 }],
              },
            ]}
          >
            <IcImage width={iconSize} height={iconSize} />
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: Color.Gray[300],
    position: "relative",
  },
  gradient: {
    width: "250%",
    height: "100%",
  },
  imagePlaceholder: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default React.memo(ThemedShimmer);
