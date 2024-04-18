import React, { useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "../../utils/Theme.tsx";
import DarkMode from "../../utils/darkmode.context.ts";

const ReportsScreen = () => {
  const { isDarkMode, setIsDarkMode } =
    useContext(DarkMode);
  return (
    <SafeAreaView>
      <View>
        <Text isDarkMode={isDarkMode}>
          Reports Page
        </Text>
      </View>
    </SafeAreaView>
  );
};


export default ReportsScreen;
