import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

function ComingSoonAnimation() {

  return <View>
    <LottieView
      source={require("../../../assets/json/Text.json")}
      style={{ width: "100%", height: "35%" }}
      autoPlay
      loop
    />
    <LottieView
      source={require("../../../assets/json/ComingSoon.json")}
      style={{ width: "100%", height: "65%" }}
      autoPlay
      loop
    />
  </View>
}

export default ComingSoonAnimation;
