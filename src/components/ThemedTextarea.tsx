import Color from "@/constants/Color";
import Radius from "@/constants/Radius";
import { ThemedTextareaProps, ThemedTextareaState } from "@/types/components";
import { scale, scaleFont, verticalScale } from "@/utils/scaleSize";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ThemedErrorMessage from "./ThemedErrorMessage";
import ThemedGap from "./ThemedGap";
import ThemedText from "./ThemedText";

export default class ThemedTextarea extends React.PureComponent<
  ThemedTextareaProps,
  ThemedTextareaState
> {
  constructor(props: ThemedTextareaProps) {
    super(props);
    this.state = {
      value: props.value || "",
      isFocused: false,
    };
  }

  componentDidUpdate(prevProps: ThemedTextareaProps) {
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

  getComputedStyles = () => {
    const { error, disabled } = this.props;
    const { isFocused } = this.state;

    let innerBorderColor = Color.Gray[400];
    let outerBorderColor = "transparent";
    let textColor = Color.Text.Primary;
    let backgroundColor = Color.Base.White;

    if (disabled) {
      innerBorderColor = Color.Gray[300];
      textColor = Color.Gray[400];
      backgroundColor = Color.Gray[50];
    } else if (error) {
      innerBorderColor = Color.Red[500];
    } else if (isFocused) {
      innerBorderColor = Color.Purple[400];
      outerBorderColor = Color.Purple["20"];
    }

    return {
      innerBorderColor,
      outerBorderColor,
      textColor,
      backgroundColor,
    };
  };

  render() {
    const { placeholder, error, disabled, label, style, ...rest } = this.props;
    const { value } = this.state;
    const stylesComputed = this.getComputedStyles();

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
            { borderColor: stylesComputed.outerBorderColor },
          ]}
        >
          <View
            style={[
              styles.container,
              {
                borderColor: stylesComputed.innerBorderColor,
                backgroundColor: stylesComputed.backgroundColor,
              },
            ]}
          >
            <TextInput
              multiline
              style={[styles.input, { color: stylesComputed.textColor }, style]}
              placeholder={placeholder}
              placeholderTextColor={Color.Gray[400]}
              editable={!disabled}
              value={value}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChangeText={this.handleChangeText}
              textAlignVertical="top"
              {...rest}
            />
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
    minHeight: verticalScale(120),
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
