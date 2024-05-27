import { StyleSheet, Platform, Dimensions } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../Screens/SettingsScreen/SettingsScreen.tsx";
import Explore from "../Screens/ExploreScreen/ExploreScreen.tsx";
import Profile from "../Screens/ProfileScreen/ProfileScreen.tsx";
import Reports from "../Screens/ReportsScreen/ReportsScreen.tsx";
import { Icon } from "react-native-paper";
import DarkMode from "../../services/utils/darkmode.context.ts";
import { useTranslation } from "react-i18next";
import Transection from "../Screens/TransectionPage/TransectionPage.tsx";
const BottomTabNavigator = createBottomTabNavigator();


const { width, height } = Dimensions.get('window');
let fontSize = 12;
let iconSize=23;

const isTablet = width >= 600 && height >= 600; // Örnek bir değer, gerçek bir değere göre değiştirin

if (isTablet) {
  fontSize = 28;
  iconSize=30;
}


export default function BottomTab() {
  const { isDarkMode } =
    useContext(DarkMode);

  const iconColor = isDarkMode ? "white" : "black";

  const { t } = useTranslation();

  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.label,
        headerTitleStyle: styles.header,
        headerTitleAlign: "center",
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === "ios" && {
            shadowOffset: { height: -2, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 15
          }
        ],
        tabBarItemStyle: {
          marginBottom: 7
        },

        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#02b875"
      }}
      safeAreaInsets={{
        bottom: 0
      }}
      initialRouteName={t("transection")}

    >
      <BottomTabNavigator.Screen
        name={t("explore")}
        component={Explore}
        options={{
          tabBarIcon: () => (
            <Icon source={"card-search-outline"} size={iconSize} color={iconColor} />
          )
        }}
      />
      <BottomTabNavigator.Screen
        name={t("reports")}
        component={Reports}
        options={{
          tabBarIcon: () => (
            <Icon source={"clipboard-file-outline"} size={iconSize} color={iconColor} />
          )
        }}
      />
      <BottomTabNavigator.Screen
        name={t("transection")}
        component={Transection}
        options={{
          tabBarIcon: () => (
            <Icon source={"clipboard-list-outline"} size={iconSize} color={iconColor} />
          )
        }}
      />
      <BottomTabNavigator.Screen
        options={{

          tabBarIcon: () => (
            <Icon source={"shield-account-outline"} size={iconSize} color={iconColor} />
          )
        }}
        name={t("profile")}
        component={Profile}
      />
      <BottomTabNavigator.Screen
        options={{
          tabBarIcon: () => (
            <Icon source={"card-bulleted-settings"} size={iconSize} color={iconColor} />
          )
        }}
        name={t("settings")}
        component={Settings}
      />
    </BottomTabNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    textTransform: "capitalize"
  },
  tabContainer: {
    position: "absolute",
    height: 65,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  label: {
    textTransform: "capitalize",
    fontSize: fontSize
  }
});
