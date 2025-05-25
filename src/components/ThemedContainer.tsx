import Color from "@/constants/Color";
import GlobalStyles from "@/styles/common";
import { ThemedContainerProps } from "@/types/components";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ThemedContainer: React.FC<ThemedContainerProps> = ({
  children,
  style,
  backgroundColor = Color.Background.Background,
  statusBarStyle = "dark-content",
}) => {
  return (
    <SafeAreaView style={[GlobalStyles.flex, { backgroundColor }]}>
      <StatusBar
        translucent
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
      />
      <KeyboardAvoidingView
        style={GlobalStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[GlobalStyles.flex, style]}>{children}</View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ThemedContainer);
