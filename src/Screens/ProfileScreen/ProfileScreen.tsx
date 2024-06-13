import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Image, FlatList, Alert, Modal, Button } from "react-native";
import styles from "./ProfileScreen.Style";
import { Divider} from "react-native-paper";
import ShiftCard from "../../Components/ShiftEnterOut/ShiftCard";
import { useTranslation } from "react-i18next";
import data from "../../../assets/js/datainout";
import {Text} from "../../../services/utils/Theme.tsx";
import DarkMode from "../../../services/utils/darkmode.context.ts";
import StoreStatusText from "../../Components/StoreIcon/StoreStatusText.tsx";
import { BarChart } from "react-native-gifted-charts";
const ProfileScreen = () => {

  const myImage = require("../../../assets/png/images.png");

  const { isDarkMode} =
    useContext(DarkMode);
  const { t  } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const onPressButton = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const barData = [
    {value: 6, label: 'M' ,frontColor: '#83B4FF'},
    {value: 8, label: 'T', frontColor: '#177AD5'},
    {value: 8, label: 'W', frontColor: '#83B4FF'},
    {value: 6, label: 'T',frontColor: '#177AD5'},
    {value: 8, label: 'F', frontColor: '#83B4FF'},
    {value: 3, label: 'S',frontColor: '#177AD5'},
    {value: 3, label: 'S',frontColor: '#83B4FF'},
  ];
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
      <StoreStatusText />
      <View style={styles.header}>
        <Image source={myImage} style={styles.image} />
        <Text isDarkMode={isDarkMode} style={styles.nameText}>{t("name")}</Text>
        <Text isDarkMode={isDarkMode} style={styles.nameText}>{t("salesperson")}</Text>
      </View>
      <View style={styles.middleHeader}>
        <TouchableOpacity style={styles.editButton} onPress={onPressButton}>
          <Text isDarkMode={isDarkMode} style={styles.buttonText}>
            {t("shifthours")}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.chartContainer}>
                <BarChart
                  showFractionalValues
                  showYAxisIndices
                  noOfSections={10}
                  maxValue={10}
                  data={barData}
                  isAnimated
                />
                <Button title="Kapat" onPress={closeModal} />
              </View>

            </View>

          </View>
        </Modal>
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
      <View style={{alignItems:"center",flex:1}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.date + item.hour}
        />
      </View>

    </View>

  );
};

export default ProfileScreen;

