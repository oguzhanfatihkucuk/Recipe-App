import React, { useContext } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "../../../services/utils/Theme.tsx";
import DarkMode from "../../../services/utils/darkmode.context.ts";
import styles from "../TransectionPage/TransectionPage.Style.tsx";
import { Divider, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// @ts-ignore
const Transection = () => {

  const { isDarkMode} =
    useContext(DarkMode);
  const navigation = useNavigation();
  const report = [
    { name: "Sales", description: "Provides an overview of sales performance, including revenue and profit, over a specific time period.", icon: "cash-register", nav: 1 },
    { name: "Products", description: "Offers a detailed breakdown of product sales and profitability at the end of the day.", icon: "clipboard-list-outline", nav: 2 },
    { name: "Add Product", description: "This functionality allows you to add a new product to your inventory.", icon: "playlist-plus", nav: 3 },
    { name: "Other", description: "All other transection related to the store.", icon: "dots-horizontal", nav: 4 }
  ];

  function navigateToPage(navValue: any) {
    switch (navValue) {
      case 1:
        // @ts-ignore
        navigation.navigate('Sales');
        break;
      case 2:
        // @ts-ignore
        navigation.navigate('Products');
        break;
      case 3:
        // @ts-ignore
        navigation.navigate('AddProduct');
        break;
      case 4:
        // @ts-ignore
        navigation.navigate('OtherTrans');
        break;

      default:
        console.warn('Invalid navigation value:', navValue);
    }
  }
  return (
    <SafeAreaView>
        <View>
          <Text isDarkMode={isDarkMode}>
            <FlatList style={styles.list}
                      data={report}
                      renderItem={({ item }) => <TouchableOpacity
                        style={{ ...styles.container, borderColor: isDarkMode ? "white" : "#718EBF" }} onPress={() => navigateToPage(item.nav)}
                       >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <View style={{alignItems:"center",paddingVertical:5}}>
                            <Icon size={102} color={"#718EBF"} source={item.icon} />
                            <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
                              {item.name}
                            </Text>
                            <Divider style={{height:15}}></Divider>
                            <Text isDarkMode={isDarkMode} style={[[styles.subtext]]}>
                              {item.description}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      }
                      numColumns={2}
                      keyExtractor={(item) => item.name}
            />
          </Text>
        </View>
    </SafeAreaView>
  );


};
//<FlatList data={data} renderItem={renderProduct}/>
export default Transection;
