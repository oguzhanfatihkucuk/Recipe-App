import React, { useContext } from "react";
import {View} from "react-native";
import styles from "../../Components/ShiftEnterOut/ShiftCard.Style";
import { t } from "i18next";
import { Text } from "../../utils/Theme.tsx";
import DarkMode from "../../utils/darkmode.context.ts";
import {Icon } from "react-native-paper";

// @ts-ignore
const ShiftCard = ({ inOut, date, hour, sales, salesCount }) => {

  const { isDarkMode} =
    useContext(DarkMode);

  return (
    <View style={styles.container}>
      <Icon size={32} source={inOut ? "account-arrow-down-outline": "account-arrow-up-outline"} color={inOut ? "green" : "red"}/>
      <View style={styles.inner1}>
        <Text isDarkMode={isDarkMode} style={styles.Text}>
          {inOut ? t("entered") : t("outed")}
        </Text>
        <Text isDarkMode={isDarkMode} style={styles.Text}>
          {hour}--{date}
        </Text>
      </View>
      <View style={styles.inner2}>
        <Text isDarkMode={isDarkMode} style={styles.Text}>
          {inOut ? "" : t("allsales") + " " + sales}
        </Text>
        <Text isDarkMode={isDarkMode} style={styles.Text}>
          {inOut ? "" : t("allsalesprice") + " " + salesCount}
        </Text>
      </View>
    </View>
  );
};

export default ShiftCard;
