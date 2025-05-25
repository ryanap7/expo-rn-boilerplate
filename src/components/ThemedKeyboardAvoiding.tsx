import GlobalStyles from "@/styles/common";
import { ThemedKeyboardAvoidingProps } from "@/types/components";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ThemedKeyboardAvoiding: React.FC<ThemedKeyboardAvoidingProps> = ({
  children,
  style,
  keyboardVerticalOffset = 40,
}) => {
  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.flex, style]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={GlobalStyles.flex}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default React.memo(ThemedKeyboardAvoiding);
