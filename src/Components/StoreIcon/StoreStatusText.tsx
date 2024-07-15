import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useStoreStatus } from '../../../services/storeSituation/StoreStatusContext';
import { Icon } from "react-native-paper";
import DeviceInfo from "react-native-device-info";
import DarkMode from "../../../services/utils/darkmode.context";
import { Text } from "../../../services/utils/Theme";

const localPhoto = require('../../../assets/ProjectScreenShots/32Bit.png');
const StoreStatusText = () => {

  //Context API kullanarak mağaza durumunun açık-kapalı olmasını öğrenir.
  const { isStoreOpen } = useStoreStatus();


  // DeviceInfo kütüphanesinden yararlanarak sistem bilgilerini öğrenir ve bunları ekrana text komponenti ile ekranda gösterir.

  let readableVersion = DeviceInfo.getReadableVersion();
  let systemVersion = DeviceInfo.getSystemVersion();

  const { isDarkMode} = useContext(DarkMode);

  return (
    <View style={styles.container}>

      <View>
        <Text isDarkMode={isDarkMode} style={{...styles.text,justifyContent:"center"}}>
          App Version: {readableVersion}
        </Text>
        <Text isDarkMode={isDarkMode} style={{...styles.text,justifyContent:"flex-start"}}>
          System Version: {systemVersion}
        </Text>
      </View>
     <View>
       <Image
         source={localPhoto}
         style={styles.photo}
       />
     </View>
      <View style={{flexDirection:"row"}}>
        <Text isDarkMode={isDarkMode} style={styles.text}>
          {isStoreOpen ? 'Store Open' : 'Store Closed'}
        </Text>
        <Icon size={24} source={isStoreOpen?"check-circle":"close-circle"} color={isStoreOpen?"green":"red"}/>
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
  },
  container: {
    flexDirection:"row",
    justifyContent:"space-between"
  },
  photo: {
    width: 90,
    height: 80,
    borderRadius: 0,
    objectFit:"contain"
  },

});

export default StoreStatusText;
