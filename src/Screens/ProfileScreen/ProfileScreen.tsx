import React, { useContext} from "react";
import { View, TouchableOpacity, Image, FlatList } from "react-native";
import styles from "./ProfileScreen.Style";
import { Divider} from "react-native-paper";
import ShiftCard from "../../Components/ShiftEnterOut/ShiftCard";
import { useTranslation } from "react-i18next";
import data from "../../Assets/datainout";
import {Text} from "../../utils/Theme.tsx";
import DarkMode from "../../utils/darkmode.context.ts";
const ProfileScreen = () => {

  const myImage = require("../../Assets/images.png");

  const { isDarkMode} =
    useContext(DarkMode);

  const { t } = useTranslation();


  // @ts-ignore
  const renderItem = ({ item }) => (
    <ShiftCard
      inOut={item.inOut}
      date={item.date}
      hour={item.hour}
      sales={item.sales}
      salesCount={item.salesCount}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={myImage} style={styles.image} />
        <Text isDarkMode={isDarkMode} style={styles.nameText}>{t("name")}</Text>
        <Text isDarkMode={isDarkMode} style={styles.nameText}>{t("salesperson")}</Text>
      </View>
      <View style={styles.middleHeader}>
        <TouchableOpacity style={styles.editButton}>
          <Text isDarkMode={isDarkMode} style={styles.buttonText}>
            {t("shifthours")}
          </Text>
        </TouchableOpacity>
        <Divider style={{ width: 10,backgroundColor: isDarkMode ? 'black' : 'white'}}/>
        <TouchableOpacity style={styles.editButton}>
          <Text isDarkMode={isDarkMode} style={styles.buttonText}>
            {t("changeregister")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middleHeader}>
        <TouchableOpacity style={styles.editButton}>
          <Text isDarkMode={isDarkMode} style={styles.buttonText}>
            {t("goals")}
          </Text>
        </TouchableOpacity>
        <Divider style={{ width: 10,backgroundColor: isDarkMode ? 'black' : 'white'}}/>
        <TouchableOpacity style={styles.editButton}>
          <Text isDarkMode={isDarkMode} style={styles.buttonText}>
            {t("editmyprofile")}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.date + item.hour}
      />
    </View>

  );
};

export default ProfileScreen;

