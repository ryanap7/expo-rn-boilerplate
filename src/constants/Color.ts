import { ColorValue } from "react-native";

const Color = {
  Gray: {
    25: "#FCFCFD",
    50: "#F9FAFB",
    100: "#F9FAFB",
    200: "#EAECF0",
    300: "#D0D5DD",
    400: "#98A2B3",
    500: "#667085",
    600: "#475467",
    700: "#344054",
    800: "#1D2939",
    900: "#101828",
  },

  Purple: {
    20: "#9747FF33",
    25: "#FAFAFF",
    50: "#F4F3FF",
    100: "#EBE9FE",
    200: "#D9D6FE",
    300: "#BDB4FE",
    400: "#9B8AFB",
    500: "#7A5AF8",
    600: "#6938EF",
    700: "#5925DC",
    800: "#4A1FB8",
    900: "#3E1C96",
  },

  Green: {
    25: "#F6FEF9",
    50: "#E8F7F1",
    100: "#B8E7D2",
    200: "#95DCBC",
    300: "#65CC9E",
    400: "#47C28B",
    500: "#19B36E",
    600: "#17A364",
    700: "#127F4E",
    800: "#0E623D",
    900: "#0B4B2E",
  },

  Red: {
    25: "#FFFAFA",
    50: "#FEEEEE",
    100: "#FDCACA",
    200: "#FCB1B1",
    300: "#FB8D8D",
    400: "#FA7777",
    500: "#F95555",
    600: "#E34D4D",
    700: "#B13C3C",
    800: "#892F2F",
    900: "#692424",
  },

  Yellow: {
    25: "#FFFCF5",
    50: "#FFFAEB",
    100: "#FEEFC7",
    200: "#FEDF89",
    300: "#FEC84B",
    400: "#FDB022",
    500: "#F79009",
    600: "#DC6803",
    700: "#B54708",
    800: "#93370D",
    900: "#792E0D",
  },

  Base: {
    White: "#FEFEFE",
    Black: "#1D232E",
  },

  Background: {
    Background: "#FFFFFF",
  },

  Border: {
    Purple: "#4F1ED8",
  },

  Button: {
    "Surface-Primary": "#FEFEFE",
    "Background-Primary": "#7A5AF8",
    "Label-Primary": "#FEFEFE",
    Primary: ["#8862F2", "#7544FC", "#5B2ED4"] as [
      ColorValue,
      ColorValue,
      ...ColorValue[]
    ],
    Secondary: ["#5E5E5E", "#1C1C1C"] as [ColorValue, ColorValue],
    "Disabled-Gradient": ["#AAA", "#999"] as [ColorValue, ColorValue],
  },

  Text: {
    Primary: "#101828",
    Secondary: "#475467",
    Body: "#344054",
    Action: "#7A5AF8",
    "Action-Hover": "#5925DC",
    Success: "#19B36E",
    Error: "#F95555",
    Disabled: "#D0D5DD",
    Warning: "#F79009",
  },
};

export default Color;
