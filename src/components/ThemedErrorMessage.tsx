import Color from "@/constants/Color";
import { ThemedErrorMessageProps } from "@/types/components";
import React, { useCallback, useEffect, useState } from "react";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import ThemedText from "./ThemedText";

const ThemedErrorMessage: React.FC<ThemedErrorMessageProps> = ({ message }) => {
  const [visible, setVisible] = useState(!!message);
  const [displayMessage, setDisplayMessage] = useState(message);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);
  const translateX = useSharedValue(0);

  const onFadeOutComplete = useCallback(() => {
    setVisible(false);
    setDisplayMessage(undefined);
  }, []);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setDisplayMessage(message);

      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      scale.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      translateX.value = withSequence(
        withTiming(-6, { duration: 50 }),
        withTiming(6, { duration: 50 }),
        withTiming(-4, { duration: 50 }),
        withTiming(4, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    } else {
      scale.value = withTiming(0.95, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      translateX.value = withTiming(0, { duration: 200 });
      opacity.value = withTiming(
        0,
        { duration: 300, easing: Easing.out(Easing.ease) },
        (isFinished) => {
          if (isFinished) {
            runOnJS(onFadeOutComplete)();
          }
        }
      );
    }
  }, [message, onFadeOutComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText type="Regular" size="sm" color={Color.Red[500]}>
        {displayMessage}
      </ThemedText>
    </Animated.View>
  );
};

export default React.memo(ThemedErrorMessage);
