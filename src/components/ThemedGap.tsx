import Spacing from "@/constants/Spacing";
import { ThemedGapProps } from "@/types/components";
import React from "react";
import { View } from "react-native";

const ThemedGap: React.FC<ThemedGapProps> = ({
  width = "none",
  height = "none",
}) => {
  return <View style={{ width: Spacing[width], height: Spacing[height] }} />;
};

export default React.memo(ThemedGap);
