import React, { useContext, useState } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Text } from "../../../services/utils/Theme.tsx";
import { Icon, Searchbar } from "react-native-paper";
import styles from "../ExploreScreen/ExploreScreenStyle.tsx";
import DarkMode from "../../../services/utils/darkmode.context.ts";
import { useNavigation } from "@react-navigation/native";


const ExploreScreen = () => {

  const items = [
    { word: "Dark Mode", description: "A user interface theme that uses dark colors for the background and text.", nav: 1,icon:"theme-light-dark" },
    { word: "Privacy", description: "The state of being free from unauthorized access or public view.", nav: 1,icon:"security" },
    { word: "About Us", description: "A section on a website or app that provides information about the company or organization.", nav: 1 ,icon:"information-outline"},
    { word: "Change Password", description: "An option to modify your login password.", nav: 1 ,icon:"lock-open-outline"},
    { word: "Light Mode", description: "A user interface theme that uses light colors for the background and text.", nav: 1,icon:"theme-light-dark" },
    { word: "Store Open", description: "Indicates that the store is currently operational for business.", nav: 1 ,icon:"check-circle"},
    { word: "Printer Test", description: "A function to verify if the printer is working properly.", nav: 1 ,icon:"printer-settings"},
    { word: "Manual Synchronization", description: "The process of manually updating data between devices or applications.", nav: 1,icon:"abacus" },
    { word: "Change Language", description: "An option to modify the language used in the interface.", nav: 1 ,icon:"alphabetical"},
    { word: "Log Out", description: "The action of ending your current session on an application or website.", nav: 1 ,icon:"logout"},
    { word: "Shift Hours", description: "The scheduled working hours for a particular shift.", nav: 2,icon:"hours-24"},
    { word: "Goals", description: "Objectives or targets that you are aiming to achieve.", nav: 2,icon:"format-list-checkbox"},
    { word: "Change Register", description: "The option to switch between different accounts or user profiles.", nav: 2 ,icon:"cash-register"},
    { word: "Edit My Profile", description: "The ability to modify your personal information on the platform.", nav: 2 ,icon:"account-edit"},
    { word: "X-Report", description: "This term likely refers to a specific report type within your system. Its meaning depends on your context.", nav: 3 ,icon:"file-send"},
    { word: "Z-Report", description: "Similar to X-Report, this refers to a specific report type. Consult your system's documentation for clarification.", nav: 3 ,icon:"file-send-outline"},
    { word: "Campaigns", description: "Marketing or promotional efforts undertaken to achieve a specific goal.", nav: 3 ,icon:"file-star"},
    { word: "Products", description: "A section where you can browse and view information about available products.", nav: 4 ,icon:"account-edit"},
    { word: "Add Products", description: "The functionality to add new items to your product inventory.", nav: 4 ,icon:"file-send"},
    { word: "Sales", description: "A report containing information about sales performance, such as revenue and quantity sold.", nav: 4 ,icon:"file-send-outline"},
  ];

  const navigation = useNavigation(); // Get navigation object
  const [searchQuery, setSearchQuery] = useState("");

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
        <Searchbar
          style={{ ...styles.searchbar, borderColor: isDarkMode ? "white" : "black" }}
          placeholder="Search"
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
                            {item.word}
                          </Text>
                          <Text isDarkMode={isDarkMode} style={[[styles.subtext]]}>
                            {item.description}
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
