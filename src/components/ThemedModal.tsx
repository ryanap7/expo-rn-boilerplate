import Color from "@/constants/Color";
import GlobalStyles from "@/styles/common";
import { ThemedModalProps, ThemedModalState } from "@/types/components";
import { scale } from "@/utils/scaleSize";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default class ThemedModal extends React.PureComponent<
  ThemedModalProps,
  ThemedModalState
> {
  opacity = new Animated.Value(0);
  scale = new Animated.Value(0.8);
  panResponder: any;

  constructor(props: ThemedModalProps) {
    super(props);
    this.state = {
      visible: !!props.visible,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
    });
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show();
    }
  }

  componentDidUpdate(prevProps: ThemedModalProps) {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show = () => {
    this.setState({ visible: true }, () => {
      Animated.parallel([
        Animated.timing(this.opacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(this.scale, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  hide = () => {
    Animated.parallel([
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(this.scale, {
        toValue: 0.8,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({ visible: false });
      this.props.onClose();
    });
  };

  render() {
    const { children, style } = this.props;
    const { visible } = this.state;

    if (!visible) return null;

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {/* Overlay */}
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: this.opacity }]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={this.hide}>
            <BlurView
              intensity={70}
              tint="dark"
              experimentalBlurMethod="dimezisBlurView"
              style={styles.blur}
            />
          </Pressable>
        </Animated.View>

        {/* Modal container */}
        <View
          style={[GlobalStyles.flex, GlobalStyles.center]}
          pointerEvents="box-none"
        >
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[
              styles.modal,
              style,
              GlobalStyles.shadow,
              {
                opacity: this.opacity,
                transform: [{ scale: this.scale }],
              },
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get("window").width * 0.8,
    maxHeight: Dimensions.get("window").height * 0.8,
    backgroundColor: Color.Base.White,
    padding: scale(20),
    borderRadius: scale(12),
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
});
