import React, { useContext } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "../../../services/utils/Theme.tsx";
import DarkMode from "../../../services/utils/darkmode.context.ts";
import styles from "../ReportsScreen/ReportsScreenStyle.tsx";
import { Divider, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import StoreStatusText from "../../Components/StoreIcon/StoreStatusText.tsx";


const ReportsScreen = () => {
  const { isDarkMode } =
    useContext(DarkMode);
  const navigation = useNavigation();



  const report = [
    {
      reportname: "User Information Screen",
      description: "X-ReportDesc",
      icon: "file-send",
      nav: 1
    },
    {
      reportname: "Z-Report",
      description: "Z-ReportDesc",
      icon: "file-send-outline",
      nav: 2
    },
    {
      reportname: "Campaigns",
      description: "CampaignsDesc",
      icon: "file-star",
      nav: 3
    },
    { reportname: "Charts", description: "OtherDesc", icon: "chart-donut-variant", nav: 4 }
  ];
  function navigateToPage(navValue: any) {
    switch (navValue) {
      case 1:
        // @ts-ignore
        navigation.navigate('User Information Screen');
        break;
      case 2:
        // @ts-ignore
        navigation.navigate('Z-Report');
        break;
      case 3:
        // @ts-ignore
        navigation.navigate('Campaings');
        break;
      case 4:
        // @ts-ignore
        navigation.navigate('Charts');
        break;

      default:
        console.warn('Invalid navigation value:', navValue);
    }
  }
  // @ts-ignore
  return (
    <SafeAreaView>
      <StoreStatusText />
      <View style={{alignItems:"center"}}>
        <FlatList style={styles.list}
                  data={report}
                  renderItem={({ item }) => <TouchableOpacity
                    style={{ ...styles.container, borderColor: isDarkMode ? "white" : "#718EBF"  } } onPress={() => navigateToPage(item.nav)}
                  >
                    <View style={{ flex: 1, flexDirection: "row" ,alignItems:"center",justifyContent:"center"}}>
                      <View style={{ alignItems: "center", paddingVertical: 5 }}>
                        <Icon size={102} color={"#718EBF"} source={item.icon} />
                        <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
                          {t(item.reportname)}
                        </Text>
                        <Divider style={{ height: 15 }}></Divider>
                        <Text isDarkMode={isDarkMode} style={[[styles.subtext]]}>
                          {t(item.description)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  }
                  numColumns={2}
                  keyExtractor={(item) => item.reportname}
        />
      </View>

    </SafeAreaView>

  );
};


export default ReportsScreen;
