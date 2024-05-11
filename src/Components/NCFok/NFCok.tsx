import React from "react";
import LottieView from "lottie-react-native";

function NFCok() {
  return <LottieView
    source={require("../../../Assets/NFCok.json")}
    style={{ width: 400, height: 700 }}
    autoPlay
    loop
  />;
}

export default NFCok;
