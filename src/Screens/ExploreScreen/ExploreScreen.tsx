import React, { useContext} from "react";
import { View,SafeAreaView } from "react-native";
import DarkMode from "../../utils/darkmode.context.ts";
import { Text } from "../../utils/Theme.tsx";
const ExploreScreen = () => {
  const { isDarkMode} =
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
