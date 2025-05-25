import Color from "@/constants/Color";
import Radius from "@/constants/Radius";
import GlobalStyles from "@/styles/common";
import { ThemedImageProps } from "@/types/components";
import { scale, verticalScale } from "@/utils/scaleSize";
import { IcBrokenImage } from "@assets/icons";
import { Image } from "expo-image";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import ThemedShimmer from "./ThemedShimmer";

const ThemedImage: React.FC<ThemedImageProps> = ({
  source,
  style,
  width = 200,
  height = 100,
  placeholderColor = Color.Gray[300],
  borderRadius = "sm",
  delayBeforeLoad,
  onLoadEnd,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const iconSize = useMemo(
    () => Math.min(scale(width), verticalScale(height)) * 0.25,
    [width, height]
  );

  const resolvedRadius =
    typeof borderRadius === "string" ? Radius[borderRadius] ?? 0 : borderRadius;

  const overlayOpacity = useRef(new Animated.Value(1)).current;

  const handleLoadEnd = useCallback(() => {
    const delay = delayBeforeLoad || 1000;
    setTimeout(() => {
      setLoading(false);
      setError(true);
      onLoadEnd?.();

      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, delay);
  }, [delayBeforeLoad, onLoadEnd, overlayOpacity]);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  return (
    <View
      style={[
        styles.container,
        GlobalStyles.center,
        { width, height, borderRadius: resolvedRadius },
        style,
      ]}
    >
      <Image
        source={source}
        style={[styles.image, { borderRadius: resolvedRadius }]}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        contentFit="cover"
        transition={0}
        cachePolicy="memory-disk"
      />

      {!error && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.overlay,
            { borderRadius: resolvedRadius, opacity: overlayOpacity },
          ]}
        />
      )}

      {loading && !error && (
        <ThemedShimmer
          type="image"
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}

      {error && (
        <View
          style={[
            styles.placeholder,
            GlobalStyles.center,
            { backgroundColor: placeholderColor, borderRadius },
          ]}
        >
          <IcBrokenImage width={iconSize} height={iconSize} />
        </View>
      )}
    </View>
  );
};

export default React.memo(ThemedImage);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Gray[300],
    position: "relative",
    overflow: "hidden",
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
