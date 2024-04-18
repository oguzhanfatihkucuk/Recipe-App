import React, { useCallback, useContext, useEffect, useState } from "react";
import {View, TouchableOpacity, BackHandler, } from "react-native";
import styles from "./SettingsScreen.Style";
import { Divider, SegmentedButtons, Switch } from "react-native-paper";
import i18next from "../../../services/i18next";
import { useTranslation } from "react-i18next";
import DarkMode from "../../utils/darkmode.context";
import { Text } from "../../utils/Theme";
import { Icon } from "react-native-paper";
import { Alert } from "react-native";


const SettingsScreen = () => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const { t } = useTranslation();

  const changeLng = (lng: string | undefined) => {
    i18next.changeLanguage(lng);
  };

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOn_2, setIsSwitchOn_2] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitch_2 = () => setIsSwitchOn_2(!isSwitchOn_2);

  const { isDarkMode, setIsDarkMode } =
    useContext(DarkMode);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  const iconColor = isDarkMode ? "white" : "black";

  // @ts-ignore
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.option}>
        <Icon size={20} color={iconColor} source="account-tie-voice-outline" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
          {t("sound")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Icon size={20} color={iconColor} source="security" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>{t("privacy")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Icon size={20} color={iconColor} source="information-outline" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>{t("aboutus")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Icon size={20} color={iconColor} source="lock-open-outline" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}> {t("changepassword")}</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
        <Icon size={20} color={iconColor} source="theme-light-dark" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
          {t("lightmode")}
        </Text>
        <Divider style={{ width: 15, backgroundColor: isDarkMode ? "black" : "white" }} />
        <Switch value={isSwitchOn} onValueChange={() => {
          onToggleSwitch();
          toggleDarkMode();
        }} />
        <Divider style={{ width: 15, backgroundColor: isDarkMode ? "black" : "white" }} />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
          {t("darkmode")}
        </Text>
      </View>
      <Divider style={styles.divider}></Divider>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
        <Icon size={20} color={iconColor} source="check-circle" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
          {t("storeopen")}
        </Text>
        <Divider style={{ width: 15, backgroundColor: isDarkMode ? "black" : "white" }} />
        <Switch value={isSwitchOn_2} onValueChange={onToggleSwitch_2} />
        <Divider style={{ width: 15, backgroundColor: isDarkMode ? "black" : "white" }} />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
          {t("storeclosed")}
        </Text>
        <Icon size={20} color={iconColor} source="close-circle" />
      </View>
      <Divider style={styles.divider}></Divider>
      <TouchableOpacity style={styles.option}>
        <Icon size={20} color={iconColor} source="printer-settings" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>{t("printertest")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Icon size={20} color={iconColor} source="abacus" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>{t("manuelsynchronization")} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={true}
        style={styles.languagebutton}>
        <Icon size={20} color={iconColor} source="alphabetical" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>{t("change-language")}</Text>
      </TouchableOpacity>
      <SegmentedButtons
        style={{ marginTop: 15 }}
        value={selectedLanguage}
        onValueChange={() => {
        }}
        buttons={
          [
            {
              value: "English",
              label: "English",
              labelStyle: { color: isDarkMode ? "white" : "black" },
              onPress: () => {
                // @ts-ignore
                Alert.alert( // Display alert
                  t("LanguageChanged"),
                  t("LanguageChangedText"),
                  [
                    {
                      text: "Cancel", onPress: () => {
                      }, style: "cancel"
                    },
                    {
                      text: "OK", onPress: () => {
                        changeLng("en");
                        setSelectedLanguage("English");
                      }
                    }
                  ]
                );

              }

            },
            {
              value: "Türkçe",
              label: "Türkçe",
              labelStyle: { color: isDarkMode ? "white" : "black" },
              onPress:() => {
                Alert.alert( // Display alert
                  t("LanguageChanged"),
                  t("LanguageChangedText"),
                  [
                    {
                      text: "Cancel", onPress: () => {
                      }, style: "cancel"
                    },
                    {
                      text: "OK", onPress: () => {
                        changeLng("tr");
                        setSelectedLanguage("Türkçe");
                      }
                    }
                  ]
                );

              }
            },
            {
              value: "Deustch",
              label: "Deustch",
              labelStyle: { color: isDarkMode ? "white" : "black" },
              onPress: () => {
                Alert.alert( // Display alert
                  t("LanguageChanged"),
                  t("LanguageChangedText"),
                  [
                    {
                      text: "Cancel", onPress: () => {
                      }, style: "cancel"
                    },
                    {
                      text: "OK", onPress: () => {
                        changeLng("de");
                        setSelectedLanguage("Deustch");
                      }
                    }

                  ]
                );

              }
            }
          ]}
      />
      <Divider style={{ height: 2, marginTop: 20 }}></Divider>
      <TouchableOpacity style={[styles.logoutButton]} onPress={() => BackHandler.exitApp()}>
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>{t("logout")}</Text>
      </TouchableOpacity>
    </View>

  );
};


export default SettingsScreen;


