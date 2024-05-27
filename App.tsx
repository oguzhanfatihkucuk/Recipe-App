import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme
} from "@react-navigation/native";
import StackNavigator from "./src/Navigation/StackNavigator";
import DarkMode from "./services/utils/darkmode.context";
import { useState } from "react";
import { AppRegistry } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { StoreStatusProvider } from "./services/storeSituation/StoreStatusContext";

AppRegistry.registerComponent("PatikaStoreApp", () => App);

export default function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: "white",
      background: "#202120",
      card: "#121212"
    }
  };

  return (
    <StoreStatusProvider>
      <RootSiblingParent>{/* <- use RootSiblingParent to wrap your root component */}
        <DarkMode.Provider
          value={{
            isDarkMode,
            setIsDarkMode
          }}
        >
          <NavigationContainer theme={isDarkMode ? CustomDarkTheme : DefaultTheme}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            <StackNavigator />
          </NavigationContainer>
        </DarkMode.Provider>
      </RootSiblingParent>
    </StoreStatusProvider>
  );
}
