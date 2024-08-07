import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import styles from "./SettingsScreen.Style";
import { Divider, SegmentedButtons, Switch } from "react-native-paper";
import i18next from "../../../services/i18next";
import { useTranslation } from "react-i18next";
import DarkMode from "../../../services/utils/darkmode.context";
import { Text } from "../../../services/utils/Theme";
import { Icon } from "react-native-paper";
import { Alert } from "react-native";
import { VolumeManager } from "react-native-volume-manager";
import Slider from "@react-native-community/slider";
import { handlePrivacyPress, handleAboutUsPress } from "./functions.tsx";
import { useStoreStatus } from "../../../services/storeSituation/StoreStatusContext";
import StoreStatusText from "../../Components/StoreIcon/StoreStatusText.tsx";
import { transferOfflineRecipeToReports } from "../../../assets/js/reports";
import Toast from 'react-native-root-toast';
import {  Badge } from 'react-native-paper';
const SettingsScreen = () => {

  //Mağaza kapalı iken yapılan satışların -merkeze gönderilmeyenler- kaç adet olduğunu tutan ve kontrol eden Hook.
  const { countOfPrinterWork, setCountOfPrinterWork } = useStoreStatus();

  //Mağaza durumunu kontrol eden hook.
  const { isStoreOpen, setIsStoreOpen } = useStoreStatus();

  //Translate işlemi için kullandığımız fonksiyon.
  const { t } = useTranslation();

  //Sistemin ses düzeyini ayarlamak için kullandığımız Hooklar.
  const [currentSystemVolume, setReportedSystemVolume] = useState<number>(0);
  const [hideUI] = useState<boolean>(false);
  const volumeChangedByListener = useRef(true);

  //Koyu tema için kullandığımız switchin bool değerinin kontrol eden hook.
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  //Mevcut translate dilini kontrol eden hook.
  const [selectedLanguage, setSelectedLanguage] = useState("");


  //Mevcut tema seçimi bilgisini Context API ile elde ettiğimiz hook.
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  //Uygulamadan çıkış yapmak için kullandığımız hook.
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
      return true;
    });

    return () => backHandler.remove();
  }, []);


  //Mevcut ses düzeyi bilgisini elde ettiğimiz hook.
  //@ts-ignore
  useEffect(() => {
    VolumeManager.getVolume().then((result) => {
      setReportedSystemVolume(result.volume);
    });

    const volumeListener = VolumeManager.addVolumeListener((result) => {
      volumeChangedByListener.current = true;
      setReportedSystemVolume(result.volume);
    });

    return () => {
      volumeListener.remove();
    };
  }, []);

  //Tema seçiminde switch harketine bağlı olarak belirtilen bool değeri değiştiren fonksiyon.
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


  //Dil değişimi için kullandığımız fonksiyon.
  const changeLng = (lng: string | undefined) => {
    i18next.changeLanguage(lng);
  };

  //Tema seçimine ait switchin değişmesi durumunda tema seçimini tersine çeviren fonksiyon.
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  //Mevcut tema seçimi bilgisine göre ikon renklerini belirleyen değişken.
  const iconColor = isDarkMode ? "white" : "black";



  /*Manuel Synchronization ile merkeze gönderilmeyen raporların, bu fonksiyon çağırılması halinde gönderildi olarak sistemde

  değişmesi. 2 adet listemiz vardı; Merkeze gönderilenler ve gönderilmeyenler olarak. Bu listelerde mağaza durumunun açık ya da kapalı

  olma durumuna göre satış fişleri bu listelere kayıt ediliyordu. Buradaki amacımız mağaza kapalı iken merkeze gönderilmeyen fişlerin

  manuel olarak merkeze gönderildi olarak işaretlenmesi.
  */
  const handleManualSYNC = ()=>{
    Alert.alert( // Display alert
      "Manuel SYNC",
      t("If the press the OK, reports have not been sent center will be send. Do you confirm?"),
      [
        {
          text: "Cancel",style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            Toast.show(
              `Reports sent successfully center.`,
              {
                duration: Toast.durations.SHORT,
              }
            );
            transferOfflineRecipeToReports();
            setCountOfPrinterWork(0);

          }
        }
      ]
    );

  };


  // @ts-ignore
  return (
    <View style={[styles.container]}>
      <StoreStatusText />
      <TouchableOpacity style={{ ...styles.option, borderColor: "transparent" }}>
        <Icon size={20} color={iconColor} source="account-tie-voice-outline" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
          {t("sound")}
        </Text>
      </TouchableOpacity>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#999"
        onValueChange={(value) => {
          VolumeManager.setVolume(value, { showUI: !hideUI });
        }}
        onSlidingComplete={async (value) => {
          setReportedSystemVolume(value);
        }}
        value={currentSystemVolume}
        step={0.001}
      />
      <Divider style={{ height: 2 }}></Divider>
      <TouchableOpacity style={styles.option} onPress={handlePrivacyPress}>
        <Icon size={20} color={iconColor} source="security" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>{t("privacy")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleAboutUsPress}>
        <Icon size={20} color={iconColor} source="information-outline" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>{t("aboutus")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={countOfPrinterWork<=0}
        style={styles.option}
        onPress={() => {
          handleManualSYNC();
        }}
      >
        <View style={styles.iconWithBadge}>
          <Icon size={20} color={iconColor} source="information-outline" />
        </View>
        <View style={styles.iconWithBadge}>
          <Text isDarkMode={isDarkMode} style={{...styles.text}}>
            {t("manuelsynchronization ")}
          </Text>
          {countOfPrinterWork > 0 && (
            <Badge style={styles.badge}>{countOfPrinterWork}</Badge>
          )}
        </View>

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
        <Icon size={20} color={iconColor} source="close-circle" />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
          {t("storeclosed")}
        </Text>
        <Divider style={{ width: 15, backgroundColor: isDarkMode ? "black" : "white" }} />
        <Switch value={isStoreOpen} onValueChange={(value) => setIsStoreOpen(value)} />
        <Divider style={{ width: 15, backgroundColor: isDarkMode ? "black" : "white" }} />
        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
          {t("storeopen")}
        </Text>
        <Icon size={20} color={iconColor} source="check-circle" />
      </View>
      <Divider style={styles.divider}></Divider>

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
            },
            {
              value: "Japenese",
              label: "Japenese",
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
                        changeLng("jp");
                        setSelectedLanguage("Japanese");
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


