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
  );
}
