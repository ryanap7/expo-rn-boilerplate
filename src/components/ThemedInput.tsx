import Color from "@/constants/Color";
import Radius from "@/constants/Radius";
import GlobalStyles from "@/styles/common";
import { ThemedInputProps, ThemedInputState } from "@/types/components";
import { scale, scaleFont, verticalScale } from "@/utils/scaleSize";
import { IcVisibility, IcVisibilityOff } from "@assets/icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import ThemedErrorMessage from "./ThemedErrorMessage";
import ThemedGap from "./ThemedGap";
import ThemedText from "./ThemedText";

export default class ThemedInput extends React.PureComponent<
  ThemedInputProps,
  ThemedInputState
> {
  constructor(props: ThemedInputProps) {
    super(props);
    this.state = {
      value: props.value || "",
      isFocused: false,
      showPassword: false,
    };
  }

  componentDidUpdate(prevProps: ThemedInputProps) {
    if (
      this.props.value !== prevProps.value &&
      this.props.value !== this.state.value
    ) {
      this.setState({ value: this.props.value ?? "" });
    }
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });
  handleChangeText = (text: string) => {
    this.setState({ value: text });
    this.props.onChangeText?.(text);
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  getComputedStyles = () => {
    const { error, disabled } = this.props;
    const { isFocused, value } = this.state;

    const filled = !!value;

    let innerBorderColor = Color.Gray[400];
    let outerBorderColor = "transparent";
    let iconColor = Color.Purple[400];
    let textColor = Color.Text.Primary;
    let backgroundColor = Color.Base.White;

    if (disabled) {
      innerBorderColor = Color.Gray[300];
      iconColor = Color.Gray[400];
      textColor = Color.Gray[400];
      backgroundColor = Color.Gray[50];
    } else if (error) {
      innerBorderColor = Color.Red[500];
      iconColor = Color.Purple[400];
    } else if (isFocused) {
      innerBorderColor = Color.Purple[400];
      outerBorderColor = Color.Purple["20"];
    } else if (filled) {
      iconColor = Color.Purple[400];
    }

    return {
      innerBorderColor,
      outerBorderColor,
      iconColor,
      textColor,
      backgroundColor,
    };
  };

  render() {
    const {
      icon,
      placeholder,
      error,
      disabled,
      secureTextEntry,
      label,
      style,
      ...rest
    } = this.props;
    const { value, showPassword } = this.state;
    const stylesComputed = this.getComputedStyles();

    const shouldShowToggle = secureTextEntry && !disabled;

    return (
      <View>
        {label && (
          <>
            <ThemedText
              type="Regular"
              size="sm"
              color={Color.Gray[600]}
              style={styles.spacing}
            >
              {label}
            </ThemedText>
            <ThemedGap height="xxs" />
          </>
        )}
        <View
          style={[
            styles.outerContainer,
            {
              borderColor: stylesComputed.outerBorderColor,
            },
          ]}
        >
          <View
            style={[
              styles.container,
              GlobalStyles.rowCenter,
              {
                borderColor: stylesComputed.innerBorderColor,
                backgroundColor: stylesComputed.backgroundColor,
              },
            ]}
          >
            {icon && (
              <>
                {icon}
                <ThemedGap width="xs" />
              </>
            )}
            <TextInput
              style={[styles.input, { color: stylesComputed.textColor }, style]}
              placeholder={placeholder}
              placeholderTextColor={Color.Gray[400]}
              editable={!disabled}
              value={value}
              secureTextEntry={secureTextEntry && !showPassword}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChangeText={this.handleChangeText}
              {...rest}
            />
            {shouldShowToggle && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.togglePasswordVisibility}
              >
                {showPassword ? (
                  <IcVisibility width={20} height={20} />
                ) : (
                  <IcVisibilityOff width={20} height={20} />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.spacing}>
          <ThemedErrorMessage message={error} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    borderWidth: 3,
    borderRadius: scale(Radius.sm),
  },
  container: {
    maxHeight: verticalScale(44),
    borderWidth: 1.5,
    borderRadius: scale(Radius.xs),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
  },
  input: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: scaleFont(14),
    lineHeight: scaleFont(14) * 1.4,
    letterSpacing: 0.3,
  },
  spacing: {
    marginLeft: scale(4),
  },
});
