import ThemedImage from "@/components/ThemedImage";
import React from "react";
import { View } from "react-native";

const ExploreScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ThemedImage
        source={{ uri: "https://picsum.photos/200/300" }}
        width={100}
        height={100}
        borderRadius="none"
      />
    </View>
  );
};

export default ExploreScreen;
