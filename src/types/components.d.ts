import { RadiusKey } from "@/constants/Radius";
import { SpacingKey } from "@/constants/Spacing";
import React, { ReactNode } from "react";
import {
  ColorValue,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewStyle,
} from "react-native";

// Font
export type FontType = "Regular" | "Medium" | "SemiBold" | "Bold";
export type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export interface ThemedTextProps extends TextProps {
  type?: FontType;
  size?: FontSize;
  color?: ColorValue;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

// Image
export interface ThemedImageProps {
  source: { uri: string } | number;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  placeholderColor?: string;
  borderRadius?: RadiusKey;
  delayBeforeLoad?: number;
  onLoadEnd?: () => void;
}

// Shimmer
export interface ThemedShimmerProps {
  type?: "image" | "default";
  width?: number;
  height?: number;
  borderRadius?: RadiusKey;
}

// Gap
export interface ThemedGapProps {
  width?: SpacingKey;
  height?: SpacingKey;
}

// Button
export type Variant = "primary" | "secondary" | "outline";

export interface ThemedButtonProps {
  variant?: Variant;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

// Input
export interface ThemedInputProps extends TextInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface ThemedInputState {
  value: string;
  isFocused: boolean;
  showPassword: boolean;
}

// Error message
export interface ThemedErrorMessageProps {
  message?: string;
}

// Textarea
export interface ThemedTextareaProps extends TextInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
}

export interface ThemedTextareaState {
  value: string;
  isFocused: boolean;
}

// KeyboardAvoiding
export type ThemedKeyboardAvoidingProps = {
  children: ReactNode;
  style?: ViewStyle;
  keyboardVerticalOffset?: number;
};

// Container
export type ThemedContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  statusBarStyle?: "light-content" | "dark-content";
};

// BottomSheet
export type ThemedBottomSheetProps = {
  type?: "full" | "content";
  visible?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
};

export type ThemedBottomSheetState = {
  visible: boolean;
};

// Modal

export type ThemedModalProps = {
  visible?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
};

export type ThemedModalState = {
  visible: boolean;
};
