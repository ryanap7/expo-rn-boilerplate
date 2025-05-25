import Color from "@/constants/Color";
import Radius from "@/constants/Radius";
import GlobalStyles from "@/styles/common";
import { ThemedButtonProps } from "@/types/components";
import { scale, verticalScale } from "@/utils/scaleSize";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  ColorValue,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import ThemedText from "./ThemedText";

const ThemedButton: React.FC<ThemedButtonProps> = ({
  variant = "primary",
  title,
  disabled = false,
  loading = false,
  style,
  onPress,
}) => {
  const isDisabled = disabled || loading;

  const getGradient = (): [ColorValue, ColorValue, ...ColorValue[]] => {
    const applyHexOpacity = (color: string, hexOpacity = "66") => {
      if (color.startsWith("#") && color.length === 7) {
        return `${color}${hexOpacity}`;
      }
      return color;
    };

    if (isDisabled) {
      switch (variant) {
        case "secondary":
          return Color.Button.Secondary.map((c) =>
            applyHexOpacity(c as string)
          ) as [ColorValue, ColorValue, ...ColorValue[]];
        case "outline":
          return ["transparent", "transparent", "transparent"];
        case "primary":
        default:
          return Color.Button.Primary.map((c) =>
            applyHexOpacity(c as string)
          ) as [ColorValue, ColorValue, ...ColorValue[]];
      }
    }
    switch (variant) {
      case "secondary":
        return Color.Button.Secondary as [
          ColorValue,
          ColorValue,
          ...ColorValue[]
        ];
      case "outline":
        return ["transparent", "transparent", "transparent"];
      case "primary":
      default:
        return Color.Button.Primary as [
          ColorValue,
          ColorValue,
          ...ColorValue[]
        ];
    }
  };

  const getTextColor = (): ColorValue => {
    if (variant === "outline") return Color.Purple[600];
    return Color.Base.White;
  };

  const gradientColors = getGradient();
  const borderColor =
    variant === "outline"
      ? Color.Button.Primary[Color.Button.Primary.length - 1]
      : gradientColors[gradientColors.length - 1];

  return (
    <Pressable onPress={onPress} disabled={isDisabled} style={style}>
      <LinearGradient
        colors={gradientColors}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={gradientColors.length === 3 ? [0, 0.29, 1] : [0, 1]}
        style={[
          styles.button,
          GlobalStyles.center,
          {
            borderWidth: 1,
            borderColor,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <View style={styles.content}>
            <ThemedText
              type="Medium"
              size="md"
              color={getTextColor()}
              style={styles.text}
            >
              {title}
            </ThemedText>
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: verticalScale(48),
    paddingHorizontal: scale(20),
    borderRadius: scale(Radius.rounded),
  },
  content: {
    width: "100%",
  },
  text: { flexShrink: 1, textAlign: "center" },
});

export default React.memo(ThemedButton);
