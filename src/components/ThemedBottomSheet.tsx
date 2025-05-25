import Color from "@/constants/Color";
import Radius from "@/constants/Radius";
import {
  ThemedBottomSheetProps,
  ThemedBottomSheetState,
} from "@/types/components";
import { scale } from "@/utils/scaleSize";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight ?? 24 : 44;

export default class ThemedBottomSheet extends React.PureComponent<
  ThemedBottomSheetProps,
  ThemedBottomSheetState
> {
  translateY = new Animated.Value(SCREEN_HEIGHT);
  opacity = new Animated.Value(1);
  panResponder: any;

  constructor(props: ThemedBottomSheetProps) {
    super(props);
    this.state = {
      visible: !!props.visible,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          this.translateY.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          this.hide();
        } else {
          this.show();
        }
      },
    });
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show();
    }
  }

  componentDidUpdate(prevProps: ThemedBottomSheetProps) {
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
      this.opacity.setValue(1);
      Animated.timing(this.translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };

  hide = () => {
    Animated.parallel([
      Animated.timing(this.translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({ visible: false });
      this.props.onClose();
    });
  };

  render() {
    const { children, style, type = "content" } = this.props;
    const { visible } = this.state;

    if (!visible) return null;

    return (
      <View style={styles.blur} pointerEvents="box-none">
        <Animated.View style={[styles.blur, { opacity: this.opacity }]}>
          <Pressable style={styles.blur} onPress={this.hide}>
            <BlurView
              intensity={70}
              tint="dark"
              experimentalBlurMethod="dimezisBlurView"
              style={styles.blur}
            />
          </Pressable>
        </Animated.View>

        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            styles.sheet,
            type === "full" && {
              top: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
            style,
            { transform: [{ translateY: this.translateY }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.Base.White,
    padding: scale(20),
    borderTopLeftRadius: scale(Radius.xl),
    borderTopRightRadius: scale(Radius.xl),
    zIndex: 1,
  },
});
