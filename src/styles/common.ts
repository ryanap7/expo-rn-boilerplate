import Color from "@/constants/Color";
import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
  // Center horizontal & vertical
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Shadow for iOS + Android
  shadow: {
    shadowColor: Color.Base.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Full size (width & height 100%)
  fullSize: {
    width: "100%",
    height: "100%",
  },

  // Flex row center
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Flex row space between
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Flex: 1
  flex: {
    flex: 1,
  },
});

export default GlobalStyles;
