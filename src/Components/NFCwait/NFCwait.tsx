import React from "react";
import LottieView from "lottie-react-native";

function NFCwait() {
  return <LottieView
    source={require("../../../Assets/nfcwait.json")}
    style={{ width: 400, height: 700 }}
    autoPlay
    loop
  />;
}

export default NFCwait;
