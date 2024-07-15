import React, { useContext, useState } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Text } from "../../../services/utils/Theme.tsx";
import { Icon, Searchbar } from "react-native-paper";
import styles from "../ExploreScreen/ExploreScreenStyle.tsx";
import DarkMode from "../../../services/utils/darkmode.context.ts";
import { useNavigation } from "@react-navigation/native";
import items from "../../../assets/js/exploreitems";
import { t } from "i18next";
import StoreStatusText from "../../Components/StoreIcon/StoreStatusText.tsx";

const ExploreScreen = () => {

  const navigation = useNavigation(); //Navigasyon objesini kullanır.

  //Arama objesi. Textinput komponentine girelen değeri tutan ve değişikliğini kontrol eden hook.
  const [searchQuery, setSearchQuery] = useState("");

  //Arama objesi filtrelemesi. Arama objesinin 'item' ile eşleşenleri filtreleyerek geri döndürür.
  const filteredItems = items.filter((item) =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { isDarkMode } =
    useContext(DarkMode);

  const iconColor = isDarkMode ? "white" : "black";

  function navigateToPage(navValue: any) {
    switch (navValue) {
      case 1:
        // @ts-ignore
        navigation.navigate('Settings');
        break;
      case 2:
        // @ts-ignore
        navigation.navigate('Profile');
        break;
      case 3:
        // @ts-ignore
        navigation.navigate('Reports');
        break;
      case 4:
        // @ts-ignore
        navigation.navigate('Transection');
        break;

      default:
        console.warn('Invalid navigation value:', navValue);
    }
  }

  return (
    <SafeAreaView>
      <View>
        <StoreStatusText />
        <Searchbar
          style={{ ...styles.searchbar, borderColor: isDarkMode ? "white" : "black" }}
          placeholder={t("search")}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {filteredItems.length > 0 ? (
          <FlatList style={styles.list}
                    data={filteredItems}
                    renderItem={({ item }) => <TouchableOpacity
                      style={{ ...styles.container, borderColor: isDarkMode ? "white" : "#718EBF" }} onPress={() => navigateToPage(item.nav)}>
                      <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Icon size={24} color={iconColor} source={item.icon}  />
                        <View>
                          <Text isDarkMode={isDarkMode} style={[[styles.text]]}>
                            {t(item.word)}
                          </Text>
                          <Text isDarkMode={isDarkMode} style={[[styles.subtext]]}>
                            {t(item.description)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    }
                    keyExtractor={(item) => item.word}
          />
        ) : (
          <Text>No results found.</Text>
        )}
      </View>
    </SafeAreaView>

  );
};


export default ExploreScreen;
