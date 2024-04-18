import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, BackHandler, SafeAreaView } from "react-native";
import DarkMode from "../../utils/darkmode.context.ts";
import { Text } from "../../utils/Theme.tsx";
const ExploreScreen = () => {
  const { isDarkMode, setIsDarkMode } =
    useContext(DarkMode);
  return (
    <SafeAreaView>
      <View>
        <Text isDarkMode={isDarkMode}>
          Explore Page
        </Text>
      </View>
    </SafeAreaView>
  );
};


export default ExploreScreen;
